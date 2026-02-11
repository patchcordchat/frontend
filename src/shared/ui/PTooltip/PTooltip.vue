<template>
  <Transition name="tooltip-fade">
    <div
      v-show="props.visible"
      ref="tooltipRef"
      class="p-tooltip"
      :style="{ maxWidth: props.maxWidth === 'auto' ? 'max-content' : props.maxWidth }"
      :data-side="props.actualPlacement"
    >
      <div class="p-tooltip__content">
        {{ props.text }}
      </div>
      <div ref="arrowRef" class="p-tooltip__arrow"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface TooltipProps {
  text: string
  visible: boolean
  maxWidth?: string | number
  actualPlacement?: string
}

const props = defineProps<TooltipProps>()

const arrowRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

defineExpose({
  arrowRef,
  tooltipRef,
})
</script>

<style lang="scss">
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.p-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: max-content;
  padding: 8px 12px;
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  border-radius: 6px;
  background: #222;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  pointer-events: none;

  &__content {
    position: relative;
    z-index: 1;
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #222;
    transform: rotate(45deg);
  }

  &[data-side^='top'] &__arrow {
    bottom: -4px;
  }

  &[data-side^='bottom'] &__arrow {
    top: -4px;
  }

  &[data-side^='left'] &__arrow {
    right: -4px;
  }

  &[data-side^='right'] &__arrow {
    left: -4px;
  }
}
</style>
