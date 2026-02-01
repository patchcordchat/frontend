<template>
  <div class="main-layout">
    <app-topbar />

    <div class="main-layout__content">
      <app-sidebar>
        <router-view name="sidebar"></router-view>
      </app-sidebar>

      <main class="main-layout__page">
        <router-view name="content"></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppTopbar, AppSidebar } from '@/widgets'
</script>

<style scoped lang="scss">
.main-layout {
  width: 100%;
  height: 100%;

  &__content {
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    min-width: 0;
    height: calc(100% - 2rem);
    min-height: 0;
  }

  &__page {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    border-top: 1px solid var(--app-border-frame);
    background-color: var(--background-base-lowest);
  }
}
</style>
