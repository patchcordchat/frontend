<template>
  <div class="server-dropdown">
    <div class="server-dropdown__badge-and-name">
      <h2 class="server-dropdown__name">chocolate nipple</h2>
    </div>

    <div class="server-dropdown__expand-indicator">
      <p-icon icon="misc.chevron-down" size="xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.server-dropdown {
  display: flex;
  gap: 2px;
  align-items: center;
  min-width: 0;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  padding-block: 0;
  padding-inline: var(--space-xs);

  &:hover {
    background-color: var(--background-modifier-hover);
  }

  &__badge-and-name {
    display: flex;
    flex: 1 1 auto;
    gap: var(--space-xs);
    align-items: center;
    min-width: 0;
  }

  &__name {
    @include mixins.text-md-semibold;

    overflow: hidden;
    min-width: 0;
    color: var(--text-strong);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__expand-indicator {
    position: relative;
    z-index: 4;
  }
}
</style>
