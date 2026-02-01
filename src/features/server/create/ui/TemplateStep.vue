<template>
  <div>
    <div class="p-modal__header p-modal__section">
      <h1 class="p-modal__title">Создайте свой сервер</h1>

      <div class="p-modal__subtitle">
        Ваш сервер — это место, где вы можете тусоваться со своими друзьями. Создайте сервер и
        начните общаться.
      </div>
    </div>

    <div class="p-modal__body p-modal__section">
      <p-button width="max" view="secondary" @click="nextStep">Свой шаблон</p-button>

      <p-button width="max" view="secondary" @click="nextStep">Игры</p-button>

      <p-button width="max" view="secondary" @click="nextStep">Друзья</p-button>

      <p-button width="max" view="secondary" @click="nextStep">Учебная группа</p-button>

      <p-button width="max" view="secondary" @click="nextStep">Школьный клуб</p-button>

      <p-button width="max" view="secondary" @click="nextStep">Местное сообщество</p-button>

      <p-button width="max" view="secondary" @click="nextStep">Художники и авторы</p-button>
    </div>

    <div class="p-modal__footer p-modal__section">
      <h2>У вас уже есть приглашение?</h2>

      <p-button width="max" view="secondary">Присоединиться к серверу</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { PButton } from '@/shared/ui'
import { CREATE_SERVER_FORM_KEY } from '../model'

const { nextStep } = inject(CREATE_SERVER_FORM_KEY)!
</script>
