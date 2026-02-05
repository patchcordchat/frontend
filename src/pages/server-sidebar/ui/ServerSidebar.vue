<template>
  <nav class="server-sidebar">
    <header class="server-sidebar__header">
      <div class="server-sidebar__header-content">
        <server-dropdown />

        <span>
          <div class="server-sidebar__invite-button">
            <p-icon icon="misc.users-add" />
          </div>
        </span>
      </div>
    </header>

    <div class="server-sidebar__body">
      <channel-list />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
import ChannelList from '@/widgets/channel-list'
import ServerDropdown from './ServerDropdown.vue'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.server-sidebar {
  @include mixins.scrollbar-thin;

  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 0;
  padding-bottom: calc(3.625rem + var(--space-xs) - 1rem);
  -webkit-margin-start: -1px;
  margin-inline-start: -1px;

  &__header {
    position: relative;
    z-index: 1;
    height: var(--custom-channel-header-height);
    height: 3rem;
    min-height: 3rem;
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

  &__body {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    overflow: hidden scroll;
    min-height: 0;
    margin-bottom: var(--space-xxs);
    padding-right: var(--space-xs);
    padding-bottom: var(--space-md);
    box-sizing: border-box;
    -webkit-padding-end: var(--space-xs);
    padding-inline-end: var(--space-xs);
    -webkit-margin-end: 1px;
    margin-inline-end: 1px;
  }

  &__invite-button {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0.375rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
  }
}
</style>
