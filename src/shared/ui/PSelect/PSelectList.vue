<template>
  <ul ref="listRef" class="p-select-list">
    <li
      v-for="(item, index) in items"
      :key="getKey(item, index)"
      class="p-select-list__item"
      :class="{ 'p-select-list__item--selected': isSelected(item) }"
      v-bind="resolveItemProps(item)"
      @click="select(item)"
    >
      <slot name="item" :item="item" :selected="isSelected(item)">
        {{ getText(item) }}
      </slot>

      <p-icon
        v-if="isSelected(item)"
        class="p-select-list__selected-indicator"
        icon="misc.rounded-check"
        size="sm"
      />
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'
import PIcon from '../PIcon/PIcon.vue'

type SelectItemKey<T> = keyof T | ((item: T) => unknown) | null | undefined

interface Props<T> {
  items: T[]
  modelValue?: unknown
  itemTitle?: SelectItemKey<T>
  itemValue?: SelectItemKey<T>
  itemProps?: (item: T) => Record<string, unknown>
}

const props = withDefaults(defineProps<Props<T>>(), {
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
  background: var(--background-base-lower);

  &__item {
    @include mixins.text-md-normal;

    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: var(--space-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--background-base-pressed);
    }

    &--selected {
      color: var(--text-primary);
      background-color: var(--background-base-selected);
    }
  }

  &__selected-indicator {
    color: var(--brand-500);
  }
}
</style>
