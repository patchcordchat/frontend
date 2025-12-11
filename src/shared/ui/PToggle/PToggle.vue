<template>
  <button @click="handleToggle" class="p-toggle" :class="{ 'p-toggle--active': model }">
    <div class="p-toggle__content">
      <slot name="default"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const model = defineModel<boolean>({})

const handleToggle = () => {
  if (props.disabled) return
  const newValue = !model.value
  model.value = newValue
}
</script>

<style scoped lang="scss">
.p-toggle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--control-item-height-sm);
  height: var(--control-item-height-sm);
  margin: 0;
  color: var(--text-secondary);
  line-height: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--background-modifier-hover);
  }

  &--active {
    color: var(--text-primary);
  }

  &__content {
    width: var(--size-lg);
    height: var(--size-lg);
  }
}
</style>
