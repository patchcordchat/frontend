<template>
  <div class="p-scrim"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.p-scrim {
  position: fixed;
  inset: 0;
  background-color: var(--background-scrim);
  pointer-events: auto;
  transform: translateZ(0);
}
</style>
