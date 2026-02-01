<template>
  <div>
    <div class="p-modal__header p-modal__section">
      <h1 class="p-modal__title">Персонализируйте свой сервер</h1>

      <div class="p-modal__subtitle">
        Персонализируйте свой новый сервер, выбрав ему название и значок. Их можно будет изменить в
        любой момент.
      </div>
    </div>

    <form class="p-modal__body p-modal__section" @submit="onSubmit">
      <p-text-field label="Название сервера" maxlength="100" type="text" name="email" required />
    </form>

    <div class="p-modal__footer p-modal__section">
      <p-button view="secondary" @click="prevStep">Назад</p-button>

      <p-button type="submit">Создать</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { PTextField, PButton } from '@/shared/ui'
import { CREATE_SERVER_FORM_KEY } from '../model'

const { prevStep, onSubmit } = inject(CREATE_SERVER_FORM_KEY)!
</script>
