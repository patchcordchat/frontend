<template>
  <div class="audio-controls">
    <audio-button type="mic" :enabled="!isMicMuted" @toggle="toggleMic" @context-menu="handleMicSettings" />

    <audio-button type="headset" :enabled="!isDeafened" @toggle="toggleDeafen" @context-menu="handleAudioSettings" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AudioButton from './AudioButton.vue'
import { useAudioStore } from '../model'

const store = useAudioStore()
const { isMicMuted, isDeafened } = storeToRefs(store)
const { toggleMic, toggleDeafen } = store

const handleMicSettings = () => {
  console.log('Open mic settings menu');
};

const handleAudioSettings = () => {
  console.log('Open output settings menu');
};
</script>

<style scoped lang="scss">
.audio-controls {
  display: flex;
  gap: var(--space-xs);
}
</style>