<template>
  <div class="audio-button" :class="{ 'audio-button--disabled': !props.enabled }">
    <p-button size="sm" :has-text="false" class="audio-button__toggle" @click="emit('toggle')" v-tooltip="{
      content: props.enabled ? 'Заглушить' : 'Включить',
      placement: 'top',
    }">
      <p-icon :icon="iconName" class="audio-button__icon" />
    </p-button>

    <p-button size="sm" :has-text="false" class="audio-button__chevron" @click="emit('context-menu')" v-tooltip="{
      content: 'Настройки',
      placement: 'top',
    }">
      <p-icon icon="misc.chevron-down" class="audio-button__icon" />
    </p-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PIcon, PButton } from '@/shared/ui';
import { vTooltip } from '@/shared/directives/v-tooltip'

interface Props {
  type: 'mic' | 'headset';
  enabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
});

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'context-menu'): void;
}>();

const iconName = computed(() =>
  props.enabled ? `misc.${props.type}` : `misc.${props.type}-off`
);
</script>

<style scoped lang="scss">
$block: '.audio-button';

#{$block} {
  display: flex;
  margin-inline-end: 0;

  &--disabled {

    #{$block}__chevron,
    #{$block}__toggle {
      color: var(--icon-voice-muted);
      background-color: var(--opacity-red-12);

      &:hover {
        color: var(--icon-voice-muted);
        background-color: var(--opacity-red-24);
      }
    }
  }

  &__toggle {
    border-end-end-radius: 0;
    border-start-end-radius: 0;
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__chevron {
    border-end-start-radius: 0;
    border-start-start-radius: 0;
    width: 1rem;
  }
}
</style>