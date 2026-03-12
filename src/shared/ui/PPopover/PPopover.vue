<template>
  <teleport to="#floating">
    <div v-if="isOpen" ref="popoverRef" class="p-popover" :style="floatingStyles">
      <div class="p-popover__content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Placement, OffsetOptions } from '@floating-ui/core'
import { useFloating, flip as flipMiddleware, offset as offsetMiddleware, autoUpdate } from '@floating-ui/vue'

interface Props {
  placement?: Placement
  offset?: OffsetOptions
  closeOnOutsideClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
  offset: 4,
  closeOnOutsideClick: true,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'open'): void
}>()

const isOpen = ref(false)
const popoverRef = ref<HTMLElement | null>(null)
const referenceEl = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(referenceEl, popoverRef, {
  placement: props.placement,
  middleware: [flipMiddleware(), offsetMiddleware(props.offset)],
  whileElementsMounted: autoUpdate,
  open: isOpen,
})

const toggle = async (event: Event, target?: HTMLElement) => {
  referenceEl.value = target ?? (event.currentTarget as HTMLElement)

  isOpen.value = !isOpen.value

  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

defineExpose({
  isOpen,
  toggle,
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-popover {
  z-index: 1;
  display: flex;
  width: 13.75rem;
  height: auto;
  max-height: 70vh;
  box-sizing: border-box;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  background: var(--background-surface-high);
  background-color: var(--background-surface-higher);
  box-shadow: var(--shadow-high);
  cursor: default;

  &__content {
    @include mixins.scrollbar-thin;

    position: relative;
    flex: 1 1 auto;
    overflow: hidden scroll;
    min-height: 0;
    padding: var(--space-sm);
    box-sizing: border-box;
  }
}
</style>