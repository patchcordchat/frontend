<template>
    <h2 class="dm-header">
        <span class="dm-header__text">
            Личные сообщения
        </span>

        <div class="dm-header__invite-button" v-tooltip="{ content: 'Создать сообщение' }">
            <p-icon icon="misc.plus" />
        </div>
    </h2>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui';
import { vTooltip } from '@/shared/directives/v-tooltip';
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.dm-header';

#{$block} {
    @include mixins.text-sm-medium;

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--size-xl);
    padding-top: 0;
    padding-bottom: var(--space-xxs);
    padding-inline: var(--space-md) var(--space-xs);
    box-sizing: border-box;
    color: var(--channels-default);
    white-space: nowrap;

    &:hover {
        #{$block}__text {
            color: var(--interactive-text-hover);
        }
    }

    &__text {
        flex: 1;
        margin-inline-end: var(--space-xs);
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__invite-button {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        margin: 0;
        color: var(--icon-muted);
        cursor: pointer
    }
}
</style>