<template>
  <ul ref="listRef" class="p-select-list">
    <li
      v-for="(item, index) in items"
      :key="getKey(item, index)"
      class="p-select-list__item"
      :class="{
        'p-select-list__item--selected': isSelected(item),
        [`p-select-list__item--size-${size}`]: size,
      }"
      v-bind="resolveItemProps(item)"
      @click="select(item)"
    >
      <slot name="item" :item="item" :selected="isSelected(item)">
        {{ getText(item) }}
      </slot>

      <p-icon
        v-if="isSelected(item)"
        class="p-select-list__selected-indicator"
        icon="misc.check-circle"
        size="sm"
      />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'
import PIcon from '../PIcon/PIcon.vue'

type SelectItemKey<T> = keyof T | ((item: T) => unknown) | null | undefined

type SelectListSize = 'sm' | 'md'

interface Props<T> {
  size?: SelectListSize
  items: T[]
  modelValue?: unknown
  itemTitle?: SelectItemKey<T>
  itemValue?: SelectItemKey<T>
  itemProps?: (item: T) => Record<string, unknown>
}

const props = withDefaults(defineProps<Props<T>>(), {
  size: 'md',
  items: () => [],
  itemTitle: 'title' as unknown as undefined,
  itemValue: 'value' as unknown as undefined,
})

const emit = defineEmits<{
  select: [value: unknown]
}>()

const listRef = ref<HTMLElement | null>(null)

const getProperty = (item: T, selector: SelectItemKey<T>): unknown => {
  if (typeof selector === 'function') {
    return selector(item)
  }
  if (item && typeof item === 'object' && selector) {
    return (item as Record<PropertyKey, unknown>)[selector as PropertyKey]
  }
  return item
}

const getText = (item: T) => getProperty(item, props.itemTitle)
const getValue = (item: T) => (props.itemValue ? getProperty(item, props.itemValue) : item)

const getKey = (item: T, index: number): PropertyKey => {
  const val = getValue(item)

  if (
    val !== null &&
    val !== undefined &&
    (typeof val === 'string' || typeof val === 'number' || typeof val === 'symbol')
  ) {
    return val as PropertyKey
  }

  return index
}

const resolveItemProps = (item: T) => {
  return props.itemProps ? props.itemProps(item) : {}
}

const isSelected = (item: T) => {
  return getValue(item) === props.modelValue
}

const select = (item: T) => {
  emit('select', getValue(item))
}

defineExpose({ listRef })
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-select-list {
  @include mixins.scrollbar-thin;

  overflow: hidden scroll;
  max-height: 16.625rem;
  border-width: 1px;
  border-style: solid;
  border-color: var(--border-subtle);
  border-radius: var(--radius-sm);
  background: var(--background-surface-higher);

  &__item {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    min-height: var(--item-height);
    padding: var(--padding);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--background-modifier-hover);
    }

    &--selected {
      color: var(--text-primary);
      background-color: var(--background-modifier-selected);
    }

    &--size {
      &-md {
        @include mixins.text-md-normal;

        --item-height: var(--input-height-md);
        --padding: var(--space-sm);
      }

      &-sm {
        @include mixins.text-sm-normal;

        --item-height: var(--input-height-sm);
        --padding: var(--space-xs);
      }
    }
  }

  &__selected-indicator {
    color: var(--brand-500);
  }
}
</style>
