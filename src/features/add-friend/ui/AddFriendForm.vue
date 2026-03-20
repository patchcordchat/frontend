<template>
    <form class="add-friend-form" autocomplete="off">
        <div class="add-friend-form__patchy-wrapper">
            <div>
                Вы можете добавить друзей по имени пользователя в Patchcord.
            </div>

            <img src="" alt="Patchy Waving" />
        </div>

        <div class="add-friend-form__input-wrapper">
            <p-input placeholder="Вы можете добавить друзей по имени пользователя в Patchcord." />

            <p-button view="filled-brand">Отправить запрос дружбы</p-button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { PButton, PInput } from '@/shared/ui';
</script>