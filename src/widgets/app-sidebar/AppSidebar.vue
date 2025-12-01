<template>
  <div class="app-sidebar">
    <servers-nav />
    <div class="app-sidebar__list">
      <slot></slot>
    </div>
    <user-area />
  </div>
</template>

<script setup lang="ts">
import ServersNav from '../servers-nav'
import UserArea from '../user-area'
</script>

<style scoped lang="scss">
.app-sidebar {
  position: relative;
  display: grid;
  flex: 0 0 auto;
  grid-template-columns: 4.5rem auto;
  width: 23.5rem;
  min-width: 0;
  min-height: 0;
  background: var(--background-base-lower);
  background-color: unset;

  &__list {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    border-top: 1px solid var(--app-border-frame);
    backdrop-filter: blur(0);
    border-start-start-radius: var(--radius-md);
    -webkit-border-start: 1px solid var(--app-border-frame);
    border-inline-start: 1px solid var(--app-border-frame);
    container-type: inline-size;
  }
}
</style>
