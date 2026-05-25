<template>
  <router-link :to="{ name: 'friends' }" class="friends-button">
    <div class="friends-button__icon">
      <p-icon icon="misc.greeting" />
    </div>

    <div class="friends-button__content">
      Друзья
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui';
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.friends-button {
  @include mixins.text-md-medium;

  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  overflow: hidden;
  max-width: 23.438rem;
  height: 2.625rem;
  box-sizing: border-box;
  color: var(--text-muted);
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: var(--radius-sm);
  margin-inline-start: var(--space-xs);
  padding-block: var(--space-xs) var(--space-xs);
  padding-inline: var(--space-xs) var(--space-md);

  &:hover {
    color: var(--interactive-text-hover);
    background-color: var(--interactive-background-hover);
  }

  &:active {
    color: var(--interactive-text-active);
    background: var(--interactive-background-active);
  }

  &.router-link-active {
    color: var(--text-default);
    background: var(--background-modifier-selected);
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-inline-end: var(--space-sm);
  }
}
</style>