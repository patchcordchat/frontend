<template>
  <div class="channel-call">
    <div class=" channel-call__content">

      <div v-if="joined" class="channel-call__video-grid">
        <peer-card :is-speaking="speaking" :videoStream="localVideoStream" />

        <peer-card v-for="peer in remotePeers" :key="peer.userId" :audioStream="peer.audioStream"
          :videoStream="peer.videoStream" :is-speaking="peer.isSpeaking" />
      </div>

      <call-connect v-else @join="callSessionStore.join" />
    </div>

    <div class="channel-call__video-controls">
      <div class="channel-call__controls-top">
      </div>

      <div v-if="joined" class="channel-call__controls-bottom">
        <call-controls @call-end="callSessionStore.leave" />

        <p-button view="filled-white" @click="callSessionStore.toggleVideo">
          Камера
        </p-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCallSessionStore } from '@/features/call-session'
import { PeerCard } from '@/entities/peer'
import CallControls from '@/widgets/call-controls'
import CallConnect from '@/widgets/call-connect'
import { PButton } from '@/shared/ui'

const callSessionStore = useCallSessionStore()
const {
  joined,
  speaking,
  localVideoStream,
  remotePeers
} = storeToRefs(callSessionStore)
</script>

<style scoped lang="scss">
$block: '.channel-call';

#{$block} {
  flex: 1 1 auto;
  overflow: hidden;
  background: var(--black);

  &:hover {

    #{$block}__controls-bottom,
    #{$block}__controls-top {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--white);
    background: var(--black);
  }

  &__video-grid {
    display: flex;
    flex: 1 1 auto;
    flex-flow: row nowrap;
    gap: var(--space-xs);
    align-items: center;
    align-self: stretch;
    justify-content: center;
    overflow: hidden scroll;
    width: 100%;
    min-width: 100px;
    height: 100%;
    padding: var(--space-sm);
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;
  }

  &__video-controls {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 var(--space-md) var(--space-md);
    inset-inline: 0;
    pointer-events: none;
  }

  &__controls-top {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    opacity: 0;
    pointer-events: all;
    transform: translate3d(0, -8px, 0);
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
  }

  &__controls-bottom {
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 0;
    opacity: 0;
    pointer-events: all;
    transform: translate3d(0, 8px, 0);
    transition: transform .2s ease-in-out, opacity .2s ease-in-out;
  }
}

.status {
  margin-right: auto;
  font-weight: bold;
}

.active {
  border-color: #c0392b !important;
  background-color: #e74c3c !important;
}
</style>