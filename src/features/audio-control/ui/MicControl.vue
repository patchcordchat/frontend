<template>
  <audio-button :icon="iconName" :tooltip="tooltip" :enabled="!isMicMuted" @toggle="toggleMic"
    @context-menu="handleMicSettings" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import AudioButton from './AudioButton.vue'
import { useAudioStore } from '../model'

const store = useAudioStore()
const { isMicMuted } = storeToRefs(store)
const { toggleMic } = store


const tooltip = computed(() => ({
  toggle: isMicMuted.value ? 'Вкл. микрофон' : 'Заглушить',
  contextMenu: 'Настройки ввода',
}));

const handleMicSettings = () => {
  console.log('Open mic settings menu');
};

const iconName = computed(() =>
  isMicMuted.value ? `misc.mic-off` : `misc.mic`
);
</script>