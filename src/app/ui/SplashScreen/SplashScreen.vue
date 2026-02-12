<template>
  <div class="splash-screen">
    <div class="splash-screen__content">
      <video class="splash-screen__spinner" autoplay loop playsinline>
        <source :src="patchCordSpinner" type="video/webm" />
      </video>

      <div class="splash-screen__text">
        <div class="splash-screen__tip-title">Знаете ли вы?</div>

        <div class="splash-screen__tip">Мы придумали Patchcord, в алкогольном угаре.</div>
      </div>
    </div>
    <div class="splash-screen__problems">
      <div class="splash-screen__problems-text">Проблемы с подключением? Сообщите нам!</div>

      <div class="splash-screen__links">
        <p-anchor class="splash-screen__link" href="https://t.me/patchcordchat" target="_blank">
          <p-icon icon="logos.telegram" size="xs" />
          Напишите нам в Telegram
        </p-anchor>

        <p-anchor
          class="splash-screen__link"
          href="https://patchcord.statuspage.io"
          target="_blank"
        >
          <p-icon icon="logos.statuspage" size="xs" />
          Состояние сервера
        </p-anchor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import patchCordSpinner from '@/shared/assets/videos/patchcord-spinner.webm'
import { PAnchor, PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.splash-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--background-gradient-lower, var(--background-base-lowest));
  opacity: 1;
  transition: opacity var(--connecting-container-fade-duration, 0.2s) ease-out;
  inset-inline: 0;

  &__content {
    text-align: center;
  }

  &__spinner {
    width: 12.5rem;
    height: 12.5rem;
    visibility: visible;
  }

  &__text {
    position: relative;
    top: -1.25rem;
  }

  &__tip-title {
    @include mixins.text-xs-semibold;

    margin-bottom: var(--space-xs);
    line-height: 1rem;
    text-transform: uppercase;
  }

  &__tip {
    @include mixins.text-md-normal;

    max-width: 18.75rem;
  }

  &__problems {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--space-xxl);
    color: var(--text-strong);
    transform: translateZ(0);
    inset-inline: 0;
  }

  &__problems-text {
    @include mixins.text-sm-normal;

    margin-bottom: var(--space-xs);
    color: var(--text-default);
  }

  &__links {
    display: flex;
    gap: var(--space-lg);
  }

  &__link {
    display: flex;
    gap: var(--space-xxs);
    align-items: center;
  }
}
</style>
