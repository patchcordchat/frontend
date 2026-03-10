<template>
  <audio-button :icon="iconName" :tooltip="tooltip" :enabled="!isDeafened" @toggle="toggleDeafen"
    @context-menu="handleSpeakerSettings" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia'
import AudioButton from './AudioButton.vue'
import { useAudioStore } from '../model'

const store = useAudioStore()
const { isDeafened } = storeToRefs(store)
const { toggleDeafen } = store

const tooltip = computed(() => Object({
  toggle: isDeafened.value ? 'Вкл. звук' : 'Откл. звук',
  contextMenu: 'Настройки вывода',
}));

const handleSpeakerSettings = () => {
  console.log('Open output settings menu');
};

const iconName = computed(() =>
  isDeafened.value ? `misc.headset-off` : `misc.headset`
);
</script>