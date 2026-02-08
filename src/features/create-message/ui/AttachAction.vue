<template>
  <div class="attach-wrapper">
    <div class="attach-button">
      <p-icon icon="misc.plus-large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
.attach-wrapper {
  position: sticky;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  padding: var(--space-sm) calc(var(--space-md) - 6px);
}

.attach-button {
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
}
</style>
