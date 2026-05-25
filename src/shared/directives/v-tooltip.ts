import { type Directive, type DirectiveBinding, h, render, type VNode } from 'vue'
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
  arrow,
  type Placement,
  type Middleware,
} from '@floating-ui/dom'
import TooltipComponent from '@/shared/ui/PTooltip'

export interface TooltipOptions {
  content: string
  placement?: Placement
  trigger?: 'hover' | 'click' | 'manual'
  maxWidth?: string | number
  delay?: number
  appendTo?: 'body' | 'parent' | string | HTMLElement
}

interface TooltipElement extends HTMLElement {
  _tooltipCleanup?: () => void
  _tooltipContainer?: HTMLElement
  _tooltipVNode?: VNode
  _tooltipShow?: () => void
  _tooltipHide?: () => void
  _tooltipToggle?: () => void
}

export const vTooltip: Directive<TooltipElement, TooltipOptions> = {
  mounted(el, binding) {
    initTooltip(el, binding)
  },

  updated(el, binding) {
    const oldVal: TooltipOptions = binding.oldValue || ({} as TooltipOptions)
    const newVal = binding.value || {}

    if (oldVal.content !== newVal.content || oldVal.maxWidth !== newVal.maxWidth) {
      updateTooltipProps(el, binding)
    }
  },

  beforeUnmount(el) {
    destroyTooltip(el)
  },
}

function initTooltip(el: TooltipElement, binding: DirectiveBinding<TooltipOptions>) {
  const options = normalizeOptions(binding.value)

  const container = document.createElement('div')

  Object.assign(container.style, {
    position: 'absolute',
    visibility: 'visible',
    inset: '0px auto auto 0px',
    margin: '0',
    [`z-index`]: 9999,
    [`pointer-events`]: 'none',
    [`max-width`]: `calc(100vw - 10px)`,
  })

  el._tooltipContainer = container

  const vnode = h(TooltipComponent, {
    text: options.content,
    visible: false,
    maxWidth: options.maxWidth,
    actualPlacement: options.placement,
  })

  render(vnode, container)
  el._tooltipVNode = vnode

  let hoverTimeout: ReturnType<typeof setTimeout>

  const show = () => {
    if (el._tooltipCleanup) return // Уже показан

    hoverTimeout = setTimeout(() => {
      // Определяем куда маунтить
      const targetContainer = resolveAppendTarget(options.appendTo, el)

      if (!container.isConnected) {
        targetContainer.appendChild(container)
      }

      const component = vnode.component
      const tooltipEl = component?.exposed?.tooltipRef.value as HTMLElement
      const arrowEl = component?.exposed?.arrowRef.value as HTMLElement

      // Активируем анимацию появления
      if (component) {
        component.props.visible = true
        component.update()
      }

      if (tooltipEl && arrowEl) {
        // Запускаем Floating UI
        el._tooltipCleanup = autoUpdate(el, tooltipEl, () => {
          updatePosition(el, container, arrowEl, binding.value.placement || 'top')
        })
      }
    }, options.delay)
  }

  // --- HIDE ---
  const hide = () => {
    clearTimeout(hoverTimeout)

    const component = vnode.component
    if (component) {
      component.props.visible = false
      component.update()
    }

    if (el._tooltipCleanup) {
      el._tooltipCleanup()
      el._tooltipCleanup = undefined
    }

    // Ждем окончания анимации
    setTimeout(() => {
      if (container.isConnected) {
        // Проверка на "передумывание" (юзер быстро увел и вернул мышь)
        const isVisible = component?.props.visible
        if (!isVisible) {
          container.remove()
        }
      }
    }, 200)
  }

  const toggle = () => {
    if (el._tooltipCleanup) hide()
    else show()
  }

  // Сохраняем методы для ручного вызова или очистки
  el._tooltipShow = show
  el._tooltipHide = hide
  el._tooltipToggle = toggle

  // --- BIND EVENTS ---
  const trigger = options.trigger
  if (trigger === 'hover') {
    el.addEventListener('mouseenter', show)
    el.addEventListener('mouseleave', hide)
    el.addEventListener('focus', show)
    el.addEventListener('blur', hide)
  } else if (trigger === 'click') {
    el.addEventListener('click', toggle)
  }
}

// Логика выбора родителя для appendChild
function resolveAppendTarget(appendTo: TooltipOptions['appendTo'], el: HTMLElement): HTMLElement {
  if (!appendTo || appendTo === 'body') return document.body

  if (appendTo === 'parent') {
    return el.parentElement || document.body
  }

  if (typeof appendTo === 'string') {
    const found = document.querySelector(appendTo)
    return (found as HTMLElement) || document.body
  }

  if (appendTo instanceof HTMLElement) {
    return appendTo
  }

  return document.body
}

function updatePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  arrowEl: HTMLElement,
  placement: Placement,
) {
  const middleware: Middleware[] = [
    offset(8),
    flip(),
    shift({ padding: 5 }),
    arrow({ element: arrowEl }),
  ]

  computePosition(reference, floating, {
    placement,
    middleware,
  }).then(({ x, y, placement: finalPlacement, middlewareData }) => {
    Object.assign(floating.style, {
      transform: `translate(${x}px, ${y}px)`,
    })

    // Обновляем data-side для CSS стрелки
    floating.setAttribute('data-side', finalPlacement)

    // Позиционируем стрелку
    if (middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow

      const placementParts = finalPlacement?.split('-')
      if (!placementParts[0]) return

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placementParts[0]] as string

      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px', // Сдвиг стрелки наружу
      })
    }
  })
}

function updateTooltipProps(el: TooltipElement, binding: DirectiveBinding<TooltipOptions>) {
  if (el._tooltipVNode && el._tooltipVNode.component) {
    const options = normalizeOptions(binding.value)
    const props = el._tooltipVNode.component.props
    props.text = options.content
    props.maxWidth = options.maxWidth
    el._tooltipVNode.component.update()
  }
}

function destroyTooltip(el: TooltipElement) {
  if (el._tooltipCleanup) el._tooltipCleanup()

  if (el._tooltipShow) {
    el.removeEventListener('mouseenter', el._tooltipShow)
    el.removeEventListener('mouseleave', el._tooltipHide!)
    el.removeEventListener('focus', el._tooltipShow)
    el.removeEventListener('blur', el._tooltipHide!)
    el.removeEventListener('click', el._tooltipToggle!)
  }

  if (el._tooltipContainer) {
    render(null, el._tooltipContainer)
    el._tooltipContainer.remove()
  }

  delete el._tooltipVNode
  delete el._tooltipContainer
}

function normalizeOptions(value: TooltipOptions): Required<
  Omit<TooltipOptions, 'placement' | 'appendTo'>
> & {
  placement: Placement
  appendTo: TooltipOptions['appendTo']
} {
  return {
    content: value.content || '',
    placement: value.placement || 'top',
    trigger: value.trigger || 'hover',
    maxWidth: value.maxWidth || 'auto',
    delay: value.delay || 200,
    appendTo: value.appendTo || 'body',
  }
}
