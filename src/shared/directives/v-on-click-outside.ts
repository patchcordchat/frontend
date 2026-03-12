import type { DirectiveBinding, ObjectDirective } from 'vue'

type ClickOutsideHandler = (event: MouseEvent, element: HTMLElement) => void

interface ClickOutsideElement extends HTMLElement {
  _clickOutsideEvent: (event: MouseEvent) => void
}

export const vOnClickOutside: ObjectDirective<ClickOutsideElement, ClickOutsideHandler> = {
  beforeMount(element: ClickOutsideElement, binding: DirectiveBinding<ClickOutsideHandler>): void {
    element._clickOutsideEvent = (event: MouseEvent): void => {
      const excludeComponent = binding.arg ? document.getElementById(binding.arg) : null
      const target = event.target as Node

      const isInsideElement = element === target || element.contains(target)
      const isInsideExcluded =
        excludeComponent != null &&
        (excludeComponent === target || excludeComponent.contains(target))

      if (!isInsideElement && !isInsideExcluded) {
        binding.value(event, element)
      }
    }

    document.addEventListener('click', element._clickOutsideEvent)
  },

  unmounted(element: ClickOutsideElement): void {
    document.removeEventListener('click', element._clickOutsideEvent)
  },
}
