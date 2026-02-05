<template>
  <div class="section-divider"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.section-divider {
  width: calc(100% - var(--space-md) - var(--space-md) + 9px);
  height: 1px;
  margin-top: calc(var(--space-sm) - 1px);
  background-color: var(--border-subtle);
  -webkit-margin-start: var(--space-md);
  margin-inline-start: var(--space-md);
}
</style>
