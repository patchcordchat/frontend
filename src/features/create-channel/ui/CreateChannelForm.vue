<template>
  <form class="create-channel-form">
    <p-radio-group label="Тип канала" :options="options" />

    <p-text-field label="Название канала" size="md" />
  </form>
</template>

<script setup lang="ts">
import { PTextField, PRadioGroup, type RadioOption } from '@/shared/ui'

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
</script>

<style lang="scss">
.create-channel-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
</style>
