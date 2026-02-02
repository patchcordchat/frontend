<template>
  <button class="purpose-option">
    <p-icon class="purpose-option__icon" :icon="props.icon" />

    <div class="purpose-option__text">
      <slot name="default"></slot>
    </div>

    <p-icon class="purpose-option__arrow" icon="misc.chevron-right" size="xs" />
  </button>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'

interface Props {
  icon: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.purpose-option {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: var(--space-xs);
  padding: 0;
  border: 1px solid var(--border-subtle);
  border-radius: var(--space-xs);
  background-color: var(--background-modifier-muted);
  cursor: pointer;

  &:hover {
    background-color: var(--interactive-background-hover);
  }

  &__icon {
    margin-block: var(--space-md) var(--space-md);
    margin-inline: var(--space-md) var(--space-md);
    width: 1.25rem;
    height: 1.25rem;
  }

  &__text {
    @include mixins.text-md-normal;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__arrow {
    margin-inline: auto var(--space-md);
  }
}
</style>
