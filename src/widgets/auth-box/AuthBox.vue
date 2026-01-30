<template>
  <form class="auth-box">
    <p-icon class="auth-box__logo" icon="logos.patchcord.combination" />

    <div class="auth-box__content-wrapper">
      <div class="auth-box__header">
        <h1 class="auth-box__header-title">{{ title }}</h1>

        <div v-if="subtitle" class="auth-box__header-subtitle">{{ subtitle }}</div>
      </div>

      <slot></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.auth-box {
  position: relative;
  width: 30rem;
  padding: 2rem;
  box-sizing: border-box;
  font-size: 1.125rem;
  border-radius: var(--radius-sm);
  background-color: var(--modal-background);
  box-shadow: var(--box-shadow-high);

  @media (width <= 486px) {
    @include mixins.scrollbar-thin;

    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    align-items: center;
    overflow: scroll;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  &__logo {
    display: none;

    @media (width <= 486px) {
      display: block;
      inset-inline-start: 3rem;
      width: 7.75rem;
      height: 1.5rem;
    }
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    text-align: center;
  }

  &__header-title {
    @include mixins.heading-xl-semibold;

    color: var(--header-primary);
  }

  &__header-subtitle {
    @include mixins.text-md-normal;

    color: var(--header-secondary);
  }
}
</style>
