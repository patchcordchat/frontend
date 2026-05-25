<template>
  <div class="channel-group">
    <div class="channel-group__content" @click.stop="emit('toggle')">
      <h3 class="channel-group__name">{{ props.name }}</h3>

      <p-icon class="channel-group__expand-indicator" icon="misc.chevron-down" size="xs" />
    </div>

    <div class="channel-group__controls" @click.stop="emit('create:channel')" v-tooltip="{
      content: 'Создать канал',
      placement: 'top',
    }">
      <p-icon icon="misc.plus" size="xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
import { vTooltip } from '@/shared/directives/v-tooltip'

interface Props {
  name: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'create:channel'): void
  (e: 'toggle'): void
}>()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.channel-group';

#{$block} {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  box-sizing: border-box;
  color: var(--channels-default);
  cursor: pointer;
  padding-inline: var(--space-md) calc(var(--space-md) - var(--space-xs));

  &:hover {
    #{$block}__content {
      color: var(--interactive-text-hover);
    }
  }

  &__content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    overflow: hidden;
    height: 100%;
  }

  &__name {
    @include mixins.text-sm-medium;

    box-sizing: border-box;
    white-space: nowrap;
  }

  &__expand-indicator {
    width: 12px;
    height: 12px;
  }

  &__controls {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;

    &:hover {
      color: var(--interactive-text-hover);
    }
  }
}
</style>
