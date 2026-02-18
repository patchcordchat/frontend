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

    <div class="p-modal__body p-modal__section">
      <purpose-option @click="nextStep" icon="pixel.couch">Для меня и друзей</purpose-option>

      <purpose-option @click="nextStep" icon="pixel.globe">Для клуба или сообщества</purpose-option>
    </div>

    <div class="p-modal__footer p-modal__section" style="flex-direction: row">
      <p-button view="secondary" @click="prevStep">Назад</p-button>
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
  (e: 'close'): void
}>()

const { prevStep, nextStep } = inject(CREATE_SERVER_FORM_KEY)!
</script>
