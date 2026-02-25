<template>
    <div class="peer-card">
        <div v-if="props.videoStream" class="peer-card__video-wrapper">
            <video class="peer-card__video" :srcObject.prop="props.videoStream" autoplay playsinline></video>
        </div>

        <div v-else class="peer-card__content">
            <p-avatar
                src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
                size="4xl" />
        </div>

        <audio v-if="props.audioStream" :srcObject.prop="props.audioStream" autoplay playsinline></audio>

        <div class="peer-card__indicators"></div>

        <div class="peer-card__overlay-container">
            <div class="peer-card__overlay-top">

            </div>

            <div class="peer-card__overlay-bottom">
                <!-- TODO Кнопки микрофона и настроек -->
            </div>
        </div>

        <div class="peer-card__border" :class="{ 'peer-card__border--speaking': props.isSpeaking }"></div>
    </div>
</template>

<script setup lang="ts">
import { PAvatar } from '@/shared/ui';

interface Props {
    videoStream?: MediaStream;
    audioStream?: MediaStream;
    isSpeaking?: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.peer-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 34rem;
    box-sizing: border-box;
    border-radius: var(--radius-sm);
    background-color: var(--primary-700);
    aspect-ratio: 16/9;

    &__content {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        inset-inline: 0;
        background-color: rgb(162 116 47);
    }

    &__indicators {
        position: absolute;
        top: var(--space-xs);
        z-index: 1;
        display: flex;
        align-items: center;
        inset-inline-end: var(--space-xs);
    }

    &__overlay-container {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: var(--space-sm);
        transition: opacity .2s ease-in-out;
        inset-inline: 0;
    }

    &__overlay-top {
        display: inline-block;
        inset-inline-start: 0;
    }

    &__overlay-bottom {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: end;
        justify-content: space-between;
        line-height: 0;
        pointer-events: none;
        inset-inline: 0;
    }

    &__video-wrapper {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: var(--primary-700);
    }

    &__video {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        object-fit: contain;
        overflow: hidden;
        width: 100%;
        height: 100%;
        transform: scaleX(-1);
        inset-inline: 0;
    }

    &__border {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: var(--radius-sm);
        pointer-events: none;
        inset-inline: 0;
        transition: box-shadow 50ms ease-out;

        &--speaking {
            box-shadow: 0 0 0 0 var(--status-speaking), inset 0 0 0 2px var(--status-speaking), inset 0 0 0 3px var(--background-base-lower);
        }
    }
}
</style>