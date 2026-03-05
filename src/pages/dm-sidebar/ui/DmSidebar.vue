<template>
    <nav class="dm-sidebar">
        <div class="dm-sidebar__search-bar">
            <p-button width="max" view="secondary" size="sm">Найти или начать беседу</p-button>
        </div>

        <div class="dm-sidebar__body">

            <ul class="dm-sidebar__channel-list">
                <a class="dm-sidebar__private-channel" href="#">
                    <p-icon icon="misc.greeting" size="sm" />

                    <div class="dm-sidebar__private-channel__content">
                        Друзья
                    </div>
                </a>

                <li v-for="i in 10" :key="i">
                    <private-channel />
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { PButton, PIcon } from '@/shared/ui';
import { PrivateChannel } from '@/entities/channel';
</script>

<style scoped lang="scss">
.dm-sidebar {
    &__private-channel {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        gap: 8px;
        align-items: center;
        overflow: hidden;
        max-width: 23.438rem;
        height: 2.625rem;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: var(--radius-sm);
        margin-inline-start: var(--space-xs);
        padding-block: 0;
        padding-inline: var(--space-xs) 0;

        &:hover {
            color: var(--interactive-text-hover);
            background-color: var(--interactive-background-hover);
        }
    }

    &__search-bar {
        position: relative;
        z-index: 2;
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        height: 3rem;
        padding: 0 var(--space-xs);
        box-sizing: border-box;
        border-bottom: 1px solid var(--border-subtle);
        box-shadow: none;
    }
}
</style>