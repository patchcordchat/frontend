<template>
  <div class="audio-button" :class="{ 'audio-button--disabled': !props.enabled }">
    <p-button :size="props.size" :has-text="false" class="audio-button__toggle" @click="emit('toggle')" v-tooltip="{
      content: props.tooltip?.toggle,
      placement: 'top',
    }">
      <p-icon :icon="props.icon" class="audio-button__icon" />
    </p-button>


    <p-button :size="props.size" :has-text="false" class="audio-button__chevron" v-tooltip="{
      content: props.tooltip?.contextMenu,
      placement: 'top',
    }" @click="popoverRef?.toggle($event)">
      <p-icon :icon="`misc.${popoverRef?.isOpen ? 'chevron-up' : 'chevron-down'}`" class="audio-button__icon" />
    </p-button>

    <p-popover ref="popoverRef" placement="top-start" :offset="{ mainAxis: 5, crossAxis: -30 }">
      <div style="pointer-events: all;">
        test modal
      </div>
    </p-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PIcon, PButton, PPopover } from '@/shared/ui';
import { vTooltip } from '@/shared/directives/v-tooltip'

type ButtonSize = 'sm' | 'md'

interface TooltipContent {
  toggle: string;
  contextMenu: string;
}

interface Props {
  icon: string;
  enabled?: boolean;
  tooltip: TooltipContent;
  size?: ButtonSize;
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  size: 'sm',
});

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'context-menu'): void;
}>();

const popoverRef = ref<InstanceType<typeof PPopover> | null>(null)
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