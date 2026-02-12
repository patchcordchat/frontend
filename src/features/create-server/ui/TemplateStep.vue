<template>
  <div>
    <div class="p-modal__header p-modal__section">
      <p-close-button class="p-modal__close-button" @click="emit('close')" />

      <h1 class="p-modal__title">Создайте свой сервер</h1>

      <div class="p-modal__subtitle">
        Ваш сервер — это место, где вы можете тусоваться со своими друзьями. Создайте сервер и
        начните общаться.
      </div>
    </div>

    <div class="p-modal__body p-modal__section template-list">
      <purpose-option @click="nextStep" icon="pixel.pencil">Свой шаблон</purpose-option>

      <div class="template-list__option-header">Начните с шаблона</div>

      <purpose-option @click="nextStep" icon="pixel.gamepad">Игры</purpose-option>

      <purpose-option @click="nextStep" icon="pixel.heart">Друзья</purpose-option>

      <purpose-option @click="nextStep" icon="pixel.peach">Учебная группа</purpose-option>

      <purpose-option @click="nextStep" icon="pixel.book">Школьный клуб</purpose-option>

      <purpose-option @click="nextStep" icon="pixel.leaf">Местное сообщество</purpose-option>

      <purpose-option @click="nextStep" icon="pixel.palette">Художники и авторы</purpose-option>
    </div>

    <div class="p-modal__footer p-modal__section">
      <h2 class="p-modal__footer-title">У вас уже есть приглашение?</h2>

      <p-button width="max" view="secondary">Присоединиться к серверу</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { PButton, PCloseButton } from '@/shared/ui'
import { CREATE_SERVER_FORM_KEY } from '../model'
import PurposeOption from './PurposeOption.vue'

// TODO Переписать (дублирование кода)
const emit = defineEmits<{
  close: []
}>()

const { nextStep } = inject(CREATE_SERVER_FORM_KEY)!
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.template-list {
  @include mixins.scrollbar-thin;

  overflow: hidden scroll !important;
  height: 20.625rem;
  margin-top: var(--space-xl);
  padding-block: var(--space-xs) var(--space-xs);
  padding-inline: var(--space-xl) var(--space-xs);

  &__option-header {
    @include mixins.text-xs-bold;

    margin-top: var(--space-md);
    margin-bottom: var(--space-xs);
    text-transform: uppercase;
  }
}
</style>
