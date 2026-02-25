<template>
  <div class="call-connect">
    <div class="call-connect__pulse-gradient"></div>

    <h2 class="call-connect__channel-name">
      Основной
    </h2>

    <div class="call-connect__participants-row">
      <div class="call-connect__no-participants">
        Сейчас в голосовом чате никого нет
      </div>
    </div>

    <div class="call-connect__join-button">
      <p-button view="filled-white" @click="emit('join')">Присоединиться к голосовому каналу</p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PButton } from '@/shared/ui';

const emit = defineEmits<{
  (e: 'join'): void
}>()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

@keyframes pulse-glow {
  0% {
    transform: translateX(-50%) scale(1);
    filter: blur(40%);
  }

  50% {
    transform: translateX(-50%) scale(1.5);
    filter: blur(20%);
  }

  100% {
    transform: translateX(-50%) scale(1);
    filter: blur(40%);
  }
}

.call-connect {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;

  &__pulse-gradient {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    inset-inline-start: 0;
    background: radial-gradient(circle at 50% 100%,
        var(--brand-600) 5%,
        var(--brand-800) 50%);

    &::before {
      content: '';
      position: absolute;
      bottom: -20%;
      left: 50%;
      width: 120%;
      height: 100%;
      background: radial-gradient(circle at 50% 100%,
          var(--brand-600) 0%,
          var(--brand-400) 5%,
          transparent 70%);
      opacity: 0.1;
      transform: translateX(-50%);
      transition: opacity 0.5s ease;
      filter: blur(40px);

    }

    &:hover {
      &::before {
        opacity: 0.3;
        animation: pulse-glow 3s infinite ease-in-out;
      }
    }
  }

  &__channel-name {
    @include mixins.heading-xxl-semibold;

    position: relative;
    overflow: hidden;
    margin: var(--space-xs) 0;
    color: var(--text-strong);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__participants-row {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__no-participants {
    @include mixins.text-sm-normal;

    color: var(--text-default);
  }

  &__join-button {
    margin-top: var(--space-xl);
  }
}
</style>