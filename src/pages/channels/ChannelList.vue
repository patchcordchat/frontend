<template>
  <nav class="channel-list">
    <header class="channel-list__header">
      <div class="channel-list__header-content">
        <div class="channel-list__server-dropdown">
          <div class="channel-list__server-name">
            <h2>#general</h2>
          </div>
          <div></div>
        </div>
      </div>
    </header>
    <ul>
      <li>
        <div><p-icon icon="misc.hashtag" size="xs" /></div>
        <div>pron</div>
      </li>
      <li>
        <div><p-icon icon="misc.speaker" size="xs" /></div>
        <div>pron</div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.channel-list {
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
