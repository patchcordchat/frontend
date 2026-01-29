<template>
  <div class="p-status-message" :class="`p-status-message--status-${props.status}`">
    <p-icon class="p-status-message__icon" icon="misc.info-circle" size="xs" />

    <div class="p-status-message__text">
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'

interface Props {
  status: 'success' | 'error' | 'warning' | 'info'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'info',
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-status-message {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-xxs);
  align-items: start;

  &--status {
    &-success {
      color: var(--text-feedback-positive);
    }

    &-error {
      color: var(--text-feedback-critical);
    }

    &-warning {
      color: var(--text-feedback-warning);
    }

    &-info {
      color: var(--text-feedback-info);
    }
  }

  &__text {
    @include mixins.text-xs-normal;
  }
}
</style>
