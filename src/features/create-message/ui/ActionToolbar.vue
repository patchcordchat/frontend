<template>
  <div class="actions">
    <p-button :has-text="false" type="button" size="sm">
      <p-icon icon="misc.gif" size="sm" />
    </p-button>

    <p-button :has-text="false" type="button" size="sm">
      <p-icon icon="misc.sticker" size="sm" />
    </p-button>

    <p-button :has-text="false" type="button" size="sm">
      <p-icon icon="misc.emoji" size="sm" />
    </p-button>
  </div>
</template>

<script setup lang="ts">
import { PIcon, PButton } from '@/shared/ui'
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
</style>
