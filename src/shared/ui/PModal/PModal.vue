<template>
  <teleport to="#floating">
    <transition-group name="modal-fade">
      <p-scrim v-if="isOpen" @click="handleScrimClick" />

      <div v-if="isOpen" class="p-modal-wrapper">
        <div class="p-modal" :class="classes">
          <template v-if="slots.default">
            <slot name="default"></slot>
          </template>

          <template v-else>
            <header class="p-modal__header p-modal__section">
              <slot name="header"></slot>

              <p-close-button v-if="showCloseButton" class="p-modal__close-button" @click="close" />
            </header>

            <main class="p-modal__body">
              <slot name="body"></slot>
            </main>

            <footer class="p-modal__footer p-modal__section">
              <slot name="footer"></slot>
            </footer>
          </template>
        </div>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup lang="ts">
import { useSlots, onMounted, onUnmounted, ref } from 'vue'
import PCloseButton from '../PCloseButton'
import PScrim from '../PScrim'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type PaddingSize = 'sm' | 'lg'

interface Props {
  size?: ModalSize
  paddingSize?: PaddingSize
  class?: string
  showCloseButton?: boolean
  closeOnScrimClick?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  closeOnScrimClick: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  close: []
  open: []
}>()

const slots = useSlots()

const classes = {
  [`p-modal--size-${props.size}`]: props.size,
  [`p-modal--padding-${props.paddingSize}`]: props.paddingSize,
  [`${props.class}`]: props.class,
}

const isOpen = ref<boolean>(false)

const close = () => {
  isOpen.value = false
  emit('close')
}

const open = () => {
  isOpen.value = true
  emit('open')
}

const handleScrimClick = () => {
  if (props.closeOnScrimClick) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

defineExpose({
  close,
  open,
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.p-modal';

#{$block}-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding-top: var(--space-xl);
  padding-bottom: var(--space-xl);
  box-sizing: border-box;
  pointer-events: none;
}

#{$block} {
  --border-radius: var(--radius-md);

  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-height: 100%;
  padding-top: var(--padding-top);
  padding-bottom: var(--padding-bottom);
  box-sizing: border-box;
  color: var(--text-default);
  border: 1px solid var(--border-subtle);
  border-radius: var(--border-radius);
  background: var(--background-surface-high);
  box-shadow: var(--box-shadow-high);
  pointer-events: auto;

  &--size {
    &-sm {
      max-width: 25rem;
      max-height: min(45rem, 100%);
    }

    &-md {
      max-width: 30rem;
      max-height: min(50rem, 100%);
    }

    &-lg {
      max-width: 42.5rem;
    }

    &-xl {
      max-width: 42.6rem;
    }

    &-xxl {
      max-width: 78.75rem;
    }

    @container (min-width: 1080px) {
      &-xxl {
        width: 80vw;
      }
    }
  }

  &--padding {
    &-sm {
      --padding: var(--space-xl);
      --padding-top: var(--space-xs);
      --padding-bottom: var(--space-md);
    }

    &-lg {
      --padding: var(--space-xxl);
      --padding-top: calc(var(--space-xl) - var(--space-md));
      --padding-bottom: var(--space-md);
    }
  }

  @media screen and (width >= 486px) and (height <= 580px) {
    @include mixins.scrollbar-thin;

    position: absolute;
    overflow-y: auto;
    width: 100%;
    max-width: none;
    max-height: none;
    border: none !important;
    border-radius: 0 !important;
    inset: 0;
  }

  &__header,
  :deep(#{$block}__header) {
    position: relative;
  }

  &__body,
  :deep(#{$block}__body) {
    overflow-y: hidden;
    min-height: 1px;
    padding-right: var(--padding);
    padding-left: var(--padding);
    box-sizing: border-box;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  &__footer,
  :deep(#{$block}__footer) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  &__section,
  :deep(#{$block}__section) {
    flex-grow: 0;
    flex-shrink: 0;
    padding: var(--space-md) var(--padding);
    box-sizing: border-box var(--space-xs);
    transition-duration: 100ms;
    transition-property: padding;
    transition-timing-function: ease-out;
  }

  :deep(#{$block}__title) {
    @include mixins.heading-xl-semibold;

    text-align: center;
    overflow-wrap: break-word;
  }

  :deep(#{$block}__subtitle) {
    @include mixins.text-md-normal;

    margin-top: var(--space-xs);
    text-align: center;
    overflow-wrap: break-word;
  }

  :deep(#{$block}__footer-title) {
    @include mixins.heading-lg-semibold;

    margin-bottom: var(--space-xs);
  }

  :deep(#{$block}__close-button) {
    position: absolute;
    top: 0.75rem;
    z-index: 1000;
    inset-inline-end: 1rem;
  }
}
</style>
