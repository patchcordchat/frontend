<template>
    <div class="people-list-item">
        <div class="people-list-item__content">
            <user-info />

            <div class="people-list-item__actions">
                <action-button icon="misc.message" tooltip="Сообщение" />

                <action-button icon="misc.dots-vertical" tooltip="Ещё" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ActionButton from './ActionButton.vue';
import UserInfo from '@/widgets/user-info';
</script>

<style scoped lang="scss">
.people-list-item {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 3.875rem;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: var(--font-weight-medium);
    line-height: 1.25rem;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid transparent;
    cursor: pointer;
    margin-inline: var(--space-xl) var(--space-lg);
    transition: background-color .2s ease;

    &:hover {
        padding: var(--space-md) 0.625rem;
        border-color: transparent;
        border-radius: var(--radius-sm);
        background-color: var(--background-modifier-hover);
        padding-inline-start: var(--space-xs);
        margin-inline: var(--space-lg) 0.625rem;
        margin-inline-start: var(--space-md);
    }

    &__content {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
    }

    &__actions {
        display: flex;
        gap: 0.625rem;
    }
}
</style>