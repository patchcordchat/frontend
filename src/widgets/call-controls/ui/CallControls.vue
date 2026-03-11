<template>
  <div class="call-controls__wrapper">
    <div class="call-controls__button-section">
      <mic-control size="md" />

      <speaker-control size="md" />

      <p-button @click="emit('call-end')" view="danger" size="md" :has-text="false">
        <p-icon icon="misc.call-end" size="md" />
      </p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MicControl, SpeakerControl } from '@/features/audio-control'
import { PButton, PIcon } from '@/shared/ui';

const emit = defineEmits<{
  (e: 'call-end'): void
}>()

</script>

<style scoped lang="scss">
.call-controls {
  &__wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-flow: row nowrap;
    gap: var(--space-sm);
    align-items: center;
    justify-content: center;
  }

  &__button-section {
    display: flex;
    gap: var(--space-xs);
    align-items: center;
    justify-content: center;
    padding: var(--space-xxs);
    border: 1px solid var(--border-muted);
    border-radius: var(--radius-md);
    background: var(--background-surface-high);
  }
}
</style>