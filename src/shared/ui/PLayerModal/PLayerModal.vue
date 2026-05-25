<template>
  <teleport to="#floating">
    <p-scrim v-if="isOpen" @click="handleScrimClick" />

    <transition name="fade">
      <div v-if="isOpen" class="p-layer-modal-wrapper">
        <div class="p-layer-modal">
          <div class="p-layer-modal__content">
            <slot name="default"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PScrim from '../PScrim'

interface Props {
  closeOnScrimClick?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnScrimClick: true,
  closeOnEscape: true,
})

const isOpen = ref<boolean>(false)

const handleScrimClick = () => {
  if (props.closeOnScrimClick) {
    close()
  }
}
</script>

<style scoped lang="scss">
.p-layer-modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
}

.p-layer-modal {
  flex-direction: column;
  overflow: hidden;
  width: calc(100% - 2.5rem * 2);
  max-width: 87.5rem;
  height: calc(100% - 2.5rem * 2);
  max-height: 100%;
  box-sizing: border-box;
  color: var(--text-default);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--background-surface-high);
  box-shadow: var(--shadow-high);
  pointer-events: auto;

  &__content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>