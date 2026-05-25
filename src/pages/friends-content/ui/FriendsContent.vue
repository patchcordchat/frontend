<template>
  <main class="friends-page">
    <div class="friends-page__header-wrapper">
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
            value: Tabs.ONLINE,
            label: 'В сети'
          },
          {
            value: Tabs.ALL,
            label: 'Все'
          },
          {
            value: Tabs.PENDING,
            label: 'Ожидание'
          },
          {
            value: Tabs.ADD_FRIEND,
            label: 'Добавить в друзья',
            class: 'add-friend-button',
          }
        ]" />
      </section>
    </div>

    <div class="friends-page__tab-body">
      <component :is="TabComponent" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { PIcon, PTabBar } from '@/shared/ui';
import { AddFriend, AllFriends, OnlineFriends, PendingFriends } from './Tabs';

const Tabs = {
  ONLINE: 'online',
  ALL: 'all',
  PENDING: 'pending',
  ADD_FRIEND: 'add_friend',
};

const TabComponents = {
  [Tabs.ONLINE]: OnlineFriends,
  [Tabs.ALL]: AllFriends,
  [Tabs.PENDING]: PendingFriends,
  [Tabs.ADD_FRIEND]: AddFriend,
};

const selectedTab = ref('online');

const TabComponent = computed(() => TabComponents[selectedTab.value])
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.friends-page {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;

  &__header-wrapper {
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
  }

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

  :deep(.add-friend-button) {
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

  &__tab-body {
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 100%;
    background-color: var(--background-gradient-chat, var(--background-base-lower));
    transform: translateZ(0);
  }
}
</style>