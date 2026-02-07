<template>
  <div class="actions">
    <button class="action-btn" type="button">
      <p-icon icon="misc.cross" />
    </button>

    <button class="action-btn" type="button">
      <p-icon icon="misc.cross" />
    </button>

    <button class="action-btn" type="button">
      <p-icon icon="misc.cross" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
.actions {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  gap: var(--space-xs);
  align-items: center;
  height: 3.5rem;
  margin-inline-end: 0.375rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.375rem;
  color: var(--interactive-text-default);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: var(--bg-ghost-hover); // Пример
  }
}
</style>
