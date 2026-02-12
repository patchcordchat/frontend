<template>
  <Transition name="fade">
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
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-tooltip {
  position: relative;
  display: flex;
  gap: var(--space-xs);
  align-items: center;
  width: auto;
  max-width: 12.5rem;
  padding: var(--space-xs) var(--space-sm);
  box-sizing: border-box;
  color: var(--text-default);
  border-radius: var(--radius-sm);
  background-color: var(--background-surface-high);
  box-shadow:
    inset 0 0 0 1px var(--border-subtle),
    var(--shadow-high);
  will-change: opacity, transform;

  &__content {
    @include mixins.text-md-semibold;

    overflow: hidden;
    color: var(--text-default);
  }

  &__arrow {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--background-surface-high);
    transform: rotate(45deg);
  }

  &[data-side^='top'] &__arrow {
    bottom: -0.25rem;
    box-shadow:
      inset -1px -1px 0 0 var(--border-subtle),
      var(--shadow-high);
  }

  &[data-side^='bottom'] &__arrow {
    top: -0.25rem;
    box-shadow:
      inset 1px 1px 0 0 var(--border-subtle),
      var(--shadow-high);
  }

  &[data-side^='left'] &__arrow {
    right: -0.25rem;
    box-shadow:
      inset -1px 1px 0 0 var(--border-subtle),
      var(--shadow-high);
  }

  &[data-side^='right'] &__arrow {
    left: -0.25rem;
    box-shadow:
      inset 1px -1px 0 0 var(--border-subtle),
      var(--shadow-high);
  }
}
</style>
