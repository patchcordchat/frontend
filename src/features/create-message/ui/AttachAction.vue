<template>
  <div class="attach-wrapper">
    <div class="attach-wrapper__button" @click="emit('click')">
      <p-icon icon="misc.plus-large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.attach-wrapper {
  display: flex;
  flex: 0 0 auto;
  align-items: start;
  align-self: stretch;
  justify-content: center;
  padding: var(--space-sm) calc(var(--space-md) - 6px);

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0.375rem;
    box-sizing: border-box;
    color: var(--interactive-text-default);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition-duration: 0.2s;
    margin-inline: -0.875rem 0.625rem;

    &:hover {
      color: var(--icon-strong);
      background-color: var(--interactive-background-selected);
    }

    &:active {
      color: var(--interactive-text-active);
    }
  }
}
</style>
