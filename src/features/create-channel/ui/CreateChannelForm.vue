<template>
  <div>
    <div>Создать канал</div>
    <div>в Текстовые каналы</div>

    <p-radio-group label="Тип канала" :options="options" />

    <p-text-field label="Название канала" />

    <div>
      <p-button view="secondary">Отмена</p-button>
      <p-button>Создать канал</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PButton, PTextField, PRadioGroup, type RadioOption } from '@/shared/ui'

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
