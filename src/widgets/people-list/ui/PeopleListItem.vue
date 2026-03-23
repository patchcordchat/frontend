<template>
    <div class="people-list-item">
        <div class="people-list-item__content">
            <user-info />

            <div class="people-list-item__actions">
                <div class="people-list__action-button">
                    <p-icon icon="misc.message" size="sm" />
                </div>

                <div class="people-list__action-button">
                    <p-icon icon="misc.dots-vertical" size="sm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui';
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
    transition: background-color .2s ease;
    margin-inline: var(--space-xl) var(--space-lg);

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