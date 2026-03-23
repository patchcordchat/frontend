<template>
    <form class="add-friend-form" autocomplete="off">
        <div class="add-friend-form__patchy-wrapper">
            <div class="add-friend-form__patchy-text">
                Вы можете добавить друзей по имени пользователя в Patchcord.
            </div>

            <img :src="PatchyWavingUrl" alt="Patchy Waving" />
        </div>

        <div class="add-friend-form__input-wrapper">
            <p-input class="add-friend-form__input"
                placeholder="Вы можете добавить друзей по имени пользователя в Patchcord." />

            <p-button view="filled-brand" size="sm">Отправить запрос дружбы</p-button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { PButton, PInput } from '@/shared/ui';
import PatchyWavingUrl from '@/shared/assets/images/patchy_waving.svg';
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.add-friend-form {
    &__patchy-wrapper {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-inline-end: 8rem;

        img {
            position: absolute;
            bottom: calc(var(--space-md) * -1);
            inset-inline-end: var(--space-md);
            width: 5.25rem;
            height: 4.5rem;
        }
    }

    &__patchy-text {
        @include mixins.heading-md-normal;

        color: var(--text-default);
    }

    &__input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 16px;
        padding: 0 12px;
        border: 1px solid var(--input-border-default);
        border-radius: 8px;
        background-color: var(--input-background-default);

        &:focus-within {
            border-color: var(--text-link);
        }
    }

    &__input {
        height: 2.75rem;
        margin-inline-end: var(--space-md);
        padding: var(--space-xxs) 0;
    }
}
</style>