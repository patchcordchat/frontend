<template>
  <li class="channel">
    <div class="channel__icon">
      <p-icon :icon="icon" />
    </div>

    <div>{{ props.name }}</div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PIcon } from '@/shared/ui'

interface Props {
  type: number
  name: string
}

const props = defineProps<Props>()

const iconMap: Record<number, string> = {
  0: 'misc.hashtag',
  1: 'misc.speaker',
}

const icon = computed(() => iconMap[props.type] ?? 'misc.hashtag')
</script>

<style scoped lang="scss">
.channel {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
  padding-top: var(--space-xxs);
  padding-bottom: var(--space-xxs);
  box-sizing: border-box;
  border-radius: var(--radius-sm);
  cursor: pointer;
  padding-inline: var(--space-xs);

  &:hover {
    background: var(--background-modifier-hover);
  }

  &--active {
    background: var(--background-modifier-selected);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
