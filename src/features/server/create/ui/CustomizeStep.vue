<template>
  <div>
    <div class="p-modal__header p-modal__section">
      <p-close-button class="p-modal__close-button" @click="emit('close')" />

      <h1 class="p-modal__title">Персонализируйте свой сервер</h1>

      <div class="p-modal__subtitle">
        Персонализируйте свой новый сервер, выбрав ему название и значок. Их можно будет изменить в
        любой момент.
      </div>
    </div>

    <form :id="formId" class="p-modal__body p-modal__section" @submit.prevent="onSubmit">
      <p-upload-icon />

      <p-text-field
        v-model="name"
        v-bind="nameAttrs"
        :error="errors.name"
        label="Название сервера"
        maxlength="100"
        type="text"
        size="md"
        required
      />
    </form>

    <div
      class="p-modal__footer p-modal__section"
      style="flex-direction: row; justify-content: space-between"
    >
      <p-button view="secondary" @click="prevStep">Назад</p-button>

      <p-button type="submit" :form="formId">Создать</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, useId } from 'vue'
import { PTextField, PButton, PCloseButton, PUploadIcon } from '@/shared/ui'
import { CREATE_SERVER_FORM_KEY } from '../model'

// TODO Переписать (дублирование кода)
const emit = defineEmits<{
  close: []
}>()

const { name, nameAttrs, errors, prevStep, onSubmit } = inject(CREATE_SERVER_FORM_KEY)!

const formId = `form-${useId()}`
</script>
