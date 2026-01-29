<template>
  <div class="not-found-page">
    <div class="not-found-page__content">
      <h1 class="not-found-page__title">Заблудились?</h1>

      <div class="not-found-page__text">
        Вы выглядите растерянно. Знаете, что помогает, если вы заблудились? Миска с горячей лапшой.
        Присаживайтесь, мы тут в поте лица пытаемся приготовить что-нибудь вкусненькое.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: var(--background-base-lowest);

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    max-width: 18.75rem;
    text-align: center;
  }

  &__title {
    @include mixins.heading-xxl-normal;

    color: var(--text-brand);
  }

  &__text {
    @include mixins.text-md-normal;

    color: var(--text-secondary);
  }
}
</style>
