<template>
  <nav class="server-sidebar">
    <header class="server-sidebar__header">
      <div class="server-sidebar__header-content">
        <div class="server-sidebar__server-dropdown">
          <div class="server-sidebar__server-name">
            <h2>chocolate nipple</h2>
          </div>

          <div>
            <p-icon icon="misc.chevron-down" size="xs" />
          </div>
        </div>
      </div>
    </header>

    <channel-list />
  </nav>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
import ChannelList from './ChannelList'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.server-sidebar {
  @include mixins.scrollbar-thin;

  position: relative;
  flex: 1 1 auto;
  overflow: hidden scroll;
  min-height: 0;
  box-sizing: border-box;

  &__header {
    position: relative;
    z-index: 1;
    height: var(--custom-channel-header-height);
    padding: var(--space-xs);
    box-sizing: border-box;
    font-family: var(--font-display);
    font-weight: var(--font-weight-medium);
    border-bottom: 1px solid var(--border-subtle);
    box-shadow: none;
    transition: background-color 0.1s linear;
    -webkit-padding-end: var(--space-md);
    padding-inline-end: var(--space-md);
  }

  &__header-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: var(--header-primary);
  }

  &__server-dropdown {
    display: flex;
    gap: 0.125rem;
    align-items: center;
    min-width: 0;
    height: 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    padding-block: 0;
    padding-inline: var(--space-xs) var(--space-xxs);
  }
}
</style>
