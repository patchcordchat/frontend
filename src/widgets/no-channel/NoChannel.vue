<template>
  <div class="no-channel">
    <div class="no-channel__content-wrapper">
      <p-icon class="no-channel__image" icon="feature.chat" />

      <div>
        <h2 class="no-channel__title">Нет текстовых каналов</h2>

        <div class="no-channel__text">
          Вы оказались в странном месте. У вас нет доступа к текстовым каналам, или на этом сервере
          их нет.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.no-channel {
  position: relative;
  flex: 1 1 auto;

  &__content-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 27.5rem;
    height: 100%;
    margin-inline: auto;
  }

  &__image {
    flex: 0 1 auto;
    width: 17rem;
    height: 13.875rem;
    margin-bottom: 2.5rem;
  }

  &__title {
    @include mixins.text-lg-semibold;

    color: var(--text-muted);
    text-align: center;
  }

  &__text {
    @include mixins.text-md-normal;

    margin-top: 0.5rem;
    color: var(--text-muted);
    text-align: center;
  }
}
</style>
