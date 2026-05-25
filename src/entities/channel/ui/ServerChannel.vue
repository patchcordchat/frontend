<template>
  <router-link class="server-channel"
    :to="{ name: 'channel', params: { serverId: props.channel.server_id, channelId: props.channel.id } }">
    <div class="server-channel__icon">
      <p-icon :icon="icon" />
    </div>

    <div class="server-channel__name">
      {{ props.channel.name }}
    </div>

    <div class="server-channel__controls">
      <p-icon class="server-channel__control" icon="misc.user-add" size="xs" v-tooltip="{
        content: 'Пригласить на канал',
        placement: 'top',
      }" />

      <p-icon class="server-channel__control" icon="misc.gear" size="xs" v-tooltip="{
        content: 'Настроить канал',
        placement: 'top',
      }" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PIcon } from '@/shared/ui'
import type { Channel } from '../model'
import { vTooltip } from '@/shared/directives/v-tooltip'

interface Props {
  channel: Channel
}

const props = defineProps<Props>()

const iconMap: Record<number, string> = {
  0: 'misc.hashtag',
  1: 'misc.speaker',
}

const icon = computed(() => iconMap[props.channel.type] ?? 'misc.hashtag')
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.server-channel';

#{$block} {
  position: relative;
  display: flex;
  gap: var(--space-xs);
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.5rem;
  padding-top: var(--space-xxs);
  padding-bottom: var(--space-xxs);
  box-sizing: border-box;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  padding-inline: var(--space-xs);
  margin-inline-start: var(--space-xs);

  &:hover {
    background: var(--background-modifier-hover);

    #{$block}__name {
      color: var(--text-strong);
    }

    #{$block}__control {
      display: block;
    }
  }

  &.router-link-active {
    background: var(--background-modifier-selected);

    #{$block}__name {
      color: var(--text-strong);
    }

    #{$block}__control {
      display: block;
    }

    #{$block}__icon {
      color: var(--icon-strong);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    color: var(--channel-icon);
  }

  &__name {
    @include mixins.text-md-medium;

    flex: 1 1 auto;
    overflow: hidden;
    color: var(--channels-default);
    line-height: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__controls {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
  }

  &__control {
    display: none;
    margin-inline-start: var(--space-xxs);
    color: var(--interactive-text-default);

    &:hover {
      color: var(--icon-strong);
    }
  }
}
</style>
