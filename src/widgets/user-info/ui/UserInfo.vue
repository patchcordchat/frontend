<template>
    <div class="user-info">
        <p-avatar class="user-info__avatar" size="sm"
            src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
            status="online" />

        <div class="user-info__text">
            <div class="user-info__username">
                dreamer#0001
            </div>

            <div class="user-info__status">
                Не в сети
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PAvatar } from '@/shared/ui'
</script>

<style scoped lang="scss">
.user-info {
    display: flex;
    overflow: hidden;

    &__avatar {
        margin-inline: 0 var(--space-sm);
    }

    &__text {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    &__username {
        overflow: hidden;
        color: var(--text-strong);
        font-weight: var(--font-weight-semibold);
        line-height: 1.25rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__status {
        color: var(--text-muted);
        font-size: 0.75rem;
        line-height: 1.25rem;
    }
}
</style>