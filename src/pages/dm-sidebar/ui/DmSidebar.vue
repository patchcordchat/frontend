<template>
    <nav class="dm-sidebar">
        <div class="dm-sidebar__search-bar">
            <p-button width="max" view="secondary">Найти или начать беседу</p-button>
        </div>

        <div class="dm-sidebar__body">
            <ul class="dm-sidebar__channel-list">
                <a class="dm-sidebar__private-channel" href="#">
                    <p-avatar class="dm-sidebar__private-channel__avatar" size="sm"
                        src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
                        status="online" />

                    <div class="dm-sidebar__private-channel__content">
                        dredhorse5
                    </div>
                </a>

                <a class="dm-sidebar__private-channel" href="#">
                    <p-avatar class="dm-sidebar__private-channel__avatar" size="sm"
                        src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
                        status="online" />

                    <div class="dm-sidebar__private-channel__content">
                        FIZIS
                    </div>
                </a>

                <a class="dm-sidebar__private-channel" href="#">
                    <p-avatar class="dm-sidebar__private-channel__avatar" size="sm"
                        src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
                        status="online" />

                    <div class="dm-sidebar__private-channel__content">
                        Patchcord
                    </div>
                </a>

                <a class="dm-sidebar__private-channel" href="#">
                    <p-avatar class="dm-sidebar__private-channel__avatar" size="sm"
                        src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
                        status="online" />

                    <div class="dm-sidebar__private-channel__content">
                        Patchcord
                    </div>
                </a>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { PButton, PAvatar } from '@/shared/ui';
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