<template>
  <div class="p-field-hint">
    <div class="p-field-hint__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-field-hint {
  opacity: 1;

  &__content {
    @include mixins.text-sm-normal;

    color: var(--text-default);
  }
}
</style>
