<template>
  <main class="friends-page">
    <section class="friends-page__header">
      <div class="icon-wrapper">
        <p-icon icon="misc.greeting" />
      </div>

      <div>
        <h1>Друзья</h1>
      </div>

      <p-icon icon="misc.dot" size="sm" />

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
          label: 'Добавить в друзья'
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
    display: flex;
    flex: 1;
    box-sizing: border-box;

    .icon-wrapper {
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
  }
}
</style>