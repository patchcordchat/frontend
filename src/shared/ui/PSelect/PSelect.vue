<template>
  <div ref="selectEl" class="p-select" :class="{
    'p-select--focused': isFocused,
    'p-select--disabled': disabled,
    [`p-select--size-${size}`]: size,
  }" tabindex="0" @click="toggle" @focus="handleFocus" @blur="handleBlur" @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle" @keydown.esc="isOpen = false">
    <span v-if="!hasValue" class="p-select__placeholder">{{ label }}</span>
    <span v-else class="p-select__value">{{ displayValue }}</span>

    <div class="p-select__indicator">
      <p-icon class="p-select__icon" :icon="isOpen ? 'misc.chevron-up' : 'misc.chevron-down'" />
    </div>
  </div>

  <teleport to="#floating">
    <p-select-list v-if="isOpen" v-on-click-outside="handleOutsideClick" ref="listComponentRef" :items="items" :size="size" :model-value="modelValue"
      :item-title="itemTitle" :item-value="itemValue" :item-props="itemProps" :style="floatingStyles"
      @select="onSelect">
      <template #item="slotProps">
        <slot name="item" v-bind="slotProps"></slot>
      </template>
    </p-select-list>
  </teleport>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, useTemplateRef } from 'vue'
import { useFloating, size as floatingSize, flip, autoUpdate, offset } from '@floating-ui/vue'
import { vOnClickOutside } from '@/shared/directives/v-on-click-outside'
import PSelectList from './PSelectList.vue'
import PIcon from '../PIcon/PIcon.vue'

type SelectItemKey<T> = keyof T | ((item: T) => unknown) | null | undefined

type SelectSize = 'sm' | 'md'

interface Props<T> {
  size?: SelectSize
  label?: string
  disabled?: boolean
  items: T[]
  itemTitle?: SelectItemKey<T>
  itemValue?: SelectItemKey<T>
  itemProps?: (item: T) => Record<string, unknown>
}

const props = withDefaults(defineProps<Props<T>>(), {
  size: 'md',
  label: 'Select',
  disabled: false,
  items: () => [],
  itemTitle: 'title' as unknown as undefined,
  itemValue: 'value' as unknown as undefined,
})

const modelValue = defineModel<unknown>()

const emit = defineEmits<{
  (e: 'update:focused', focused: boolean): void
}>()

const isOpen = ref(false)
const isFocused = ref(false)

const selectEl = useTemplateRef<HTMLElement>('selectEl')

interface ListComponentExpose {
  listRef: HTMLElement | null
}
const listComponentRef = ref<ListComponentExpose | null>(null)

const { floatingStyles } = useFloating(
  selectEl,
  computed(() => listComponentRef.value?.listRef),
  {
    placement: 'bottom-start',
    middleware: [
      flip({ fallbackPlacements: ['top-start'] }),
      offset(4),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            zIndex: '1000',
          })
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
    open: isOpen,
  },
)

const getProperty = (item: T, selector: SelectItemKey<T>): unknown => {
  if (typeof selector === 'function') return selector(item)
  if (item && typeof item === 'object' && selector) {
    return (item as Record<PropertyKey, unknown>)[selector as PropertyKey]
  }
  return item
}

const hasValue = computed(
  () => modelValue.value !== null && modelValue.value !== undefined && modelValue.value !== '',
)

const displayValue = computed(() => {
  if (!hasValue.value) return ''

  const selectedItem = props.items.find((item) => {
    const val = props.itemValue ? getProperty(item, props.itemValue) : item
    return val === modelValue.value
  })

  if (!selectedItem) return modelValue.value
  return props.itemTitle ? getProperty(selectedItem, props.itemTitle) : selectedItem
})

const toggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const onSelect = (value: unknown) => {
  modelValue.value = value
  isOpen.value = false
  selectEl.value?.focus()
}

const handleFocus = () => {
  if (props.disabled) return
  isFocused.value = true
  emit('update:focused', true)
}

const handleBlur = () => {
  isFocused.value = false
  emit('update:focused', false)
}

const handleOutsideClick = (event: Event) => {
  const isSelect = selectEl.value?.contains(event.target as Node)

  if (!isSelect) {
    isOpen.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-select {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-xs);
  align-items: center;
  width: 100%;
  min-height: var(--select-height);
  box-sizing: border-box;
  color: var(--text-default);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);
  background-color: var(--input-background);
  cursor: pointer;
  transition: border-color 0.1s ease;
  padding-block: var(--space-xs);
  padding-inline: var(--space-sm) var(--space-xs);
  user-select: none;

  &__placeholder {
    color: var(--text-secondary);
  }

  &__value {
    color: var(--text-default);
  }

  &__indicator {
    display: flex;
    align-items: center;
    width: 1.125rem;
    height: 1.125rem;
  }

  &--size {
    &-md {
      @include mixins.text-md-normal;

      --select-height: var(--input-height-md);
    }

    &-sm {
      @include mixins.text-sm-normal;

      --select-height: var(--input-height-sm);
    }
  }
}
</style>
