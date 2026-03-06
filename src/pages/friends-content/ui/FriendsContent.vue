<template>
  <main class="friends-page">
    <section class="friends-page__header">
      <div class="friends-page__icon-wrapper">
        <p-icon icon="misc.greeting" />
      </div>

      <div class="friends-page__title-wrapper">
        <h1 class="friends-page__title">Друзья</h1>
      </div>

      <p-icon class="friends-page__dot" icon="misc.dot" size="sm" />

      <p-tab-bar v-model="selectedTab" :items="[
        {
          value: 'online',
          label: 'В сети'
        },
        {
          value: 'all',
          label: 'Все'
        },
        {
          value: 'pending',
          label: 'Ожидание'
        },
        {
          value: 'add_friend',
          label: 'Добавить в друзья',
          class: 'add-friend-tab',
        }
      ]" />
    </section>

    <div class="friends-page__tab-body">

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PIcon, PTabBar } from '@/shared/ui';

const selectedTab = ref('online');
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.friends-page {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 3rem;
  min-height: 3rem;
  padding: var(--space-xs);
  color: var(--text-default);
  border-bottom: 1px solid var(--border-subtle);
  background: var(--background-base-low);
  cursor: default;
  padding-inline-start: var(--space-md);

  &__header {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    overflow: auto;
    overflow: hidden;
    min-width: 0;
    scrollbar-width: none;
    box-sizing: border-box;
  }

  &__icon-wrapper {
    position: relative;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: var(--space-xxl);
    height: var(--space-xxl);
    margin: 0;

    svg {
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      color: var(--channel-icon);
    }
  }

  &__title-wrapper {
    flex: 0 0 auto;
    margin-block: 0;
    margin-inline: 0 8px;
    min-width: auto;
    box-sizing: border-box;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    box-sizing: border-box;
    color: var(--text-strong);
    white-space: nowrap;

    @include mixins.text-md-medium;
  }

  &__dot {
    width: 4px;
    height: 4px;
    margin: 0 4px;
    color: var(--background-modifier-strong);
  }

  :deep(.add-friend-tab) {
    color: var(--white);
    border-color: var(--control-primary-border-default);
    background-color: var(--control-primary-background-default);

    &:hover {
      color: var(--status-positive-text);
      background-color: var(--control-primary-background-hover);
    }

    &[aria-selected="true"] {
      color: var(--text-brand);
      background-color: var(--opacity-blurple-16);

      &:active {
        background-color: var(--control-primary-background-active);
      }
    }
  }
}
</style>