<template>
  <form :id="formId" class="create-channel-form" @submit.prevent="onSubmit">
    <p-radio-group v-model="type" v-bind="typeAttrs" label="Тип канала" :options="options" />

    <p-text-field v-model="name" v-bind="nameAttrs" label="Название канала" size="md" />
  </form>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { PTextField, PRadioGroup, type RadioOption } from '@/shared/ui'
import { useCreateChannelForm } from '../model'

const options: RadioOption<number>[] = [
  {
    label: 'Текст',
    value: 1,
    description: 'Отправляйте сообщения, изображения, GIF, эмодзи, мнения и приколы',
    icon: 'misc.hashtag',
  },
  {
    label: 'Голос',
    value: 2,
    description: 'Общайтесь голосом или в видеочате и пользуйтесь функцией показа экрана',
    icon: 'misc.speaker',
  },
  {
    label: 'Форум',
    value: 3,
    description: 'Создайте площадку для обсуждений',
    icon: 'misc.chat-bubbles',
  },
]

const formApi = useCreateChannelForm('123')
const { name, nameAttrs, type, typeAttrs, onSubmit } = formApi

const formId = `form-${useId()}`

defineExpose({
  formId,
})
</script>

<style lang="scss">
.create-channel-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
</style>
