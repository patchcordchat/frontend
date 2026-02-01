<template>
  <teleport to="#floating">
    <p-scrim />

    <div class="p-modal-wrapper">
      <div class="p-modal" :class="classes">
        <template v-if="slots.default">
          <slot name="default"></slot>
        </template>

        <template v-else>
          <header class="p-modal__header p-modal__section">
            <slot name="header"></slot>
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
  </teleport>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import PScrim from '../PScrim/PScrim.vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type PaddingSize = 'sm' | 'lg'

interface Props {
  size?: ModalSize
  paddingSize?: PaddingSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  paddingSize: 'sm',
})

const slots = useSlots()

const classes = {
  [`p-modal--size-${props.size}`]: true,
  [`p-modal--padding-${props.paddingSize}`]: true,
}
</script>

<style scoped lang="scss">
.p-modal-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: calc(2rem + var(--space-xl)) var(--space-xl);
  box-sizing: border-box;
  pointer-events: none;
}

.p-modal {
  --border-radius: var(--radius-md);

  display: flex;
  flex-direction: column;
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

  &__header {
    position: relative;
  }

  &__body {
    overflow-y: hidden;
    min-height: 1px;
    padding-right: var(--padding);
    padding-left: var(--padding);
    box-sizing: border-box;
    word-break: break-all;
    overflow-wrap: break-word;
  }

  &__footer {
    padding-bottom: 0;
    overflow-wrap: break-word;
    word-break: break-all;
  }

  &__section {
    flex-grow: 0;
    flex-shrink: 0;
    padding: var(--space-md) var(--padding);
    box-sizing: border-box var(--space-xs);
    transition-duration: 100ms;
    transition-property: padding;
    transition-timing-function: ease-out;
  }
}
</style>
