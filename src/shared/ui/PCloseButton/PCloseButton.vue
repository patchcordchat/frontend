<template>
  <button class="p-close-button">
    <p-icon icon="misc.cross" />
  </button>
</template>

<script setup lang="ts">
import PIcon from '../PIcon'
</script>

<style scoped>
.p-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 24px;
  padding: 4px;
  box-sizing: content-box;
  color: var(--icon-strong);
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  line-height: 16px;
  border: none;
  border-radius: 3px;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  user-select: none;
}
</style>
