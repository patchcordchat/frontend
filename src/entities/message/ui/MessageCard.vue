<template>
  <div class="message">
    <div class="message__contents">
      <p-avatar class="message__user-avatar" size="md"
        src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" />

      <h3 class="message__header">
        <span class="message__username">{{ props.message.author.username }}</span>

        <time class="message__timestamp">{{ formatTimestamp(props.message.timestamp) }}</time>
      </h3>

      <div class="message__content">
        <span>{{ props.message.content }}</span>
      </div>
    </div>

    <div class="message__accessories">
      <div class="message-reactions"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../model';
import { PAvatar } from '@/shared/ui'

interface Props {
  message: Message
}

const props = defineProps<Props>()

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped lang="scss">
.message {
  position: relative;
  min-height: 2.75rem;
  margin-top: 1.0625rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  overflow-wrap: break-word;
  padding-inline-start: 4.5rem;
  border-end-end-radius: var(--radius-xs);
  border-start-end-radius: var(--radius-xs);
  padding-inline-end: var(--space-xl) !important;
  user-select: text;

  &:hover {
    background: var(--background-modifier-hover);
  }

  &__header {
    position: relative;
    display: block;
    overflow: hidden;
    min-height: 1.375rem;
    color: var(--text-muted);
    line-height: 1.375rem;
    white-space: break-spaces;
  }

  &__user-avatar {
    position: absolute;
    z-index: 1;
    width: var(--chat-avatar-size);
    height: 2.5rem;
    margin-top: 0.125rem;
    user-select: none;
    inset-inline-start: var(--space-md);
    border-radius: 50%;
    cursor: pointer;
  }

  &__username {
    position: relative;
    display: inline;
    flex-shrink: 0;
    overflow: hidden;
    color: var(--text-strong);
    font-size: 1rem;
    font-weight: var(--font-weight-medium);
    line-height: 1.375rem;
    vertical-align: baseline;
    margin-inline-end: 0.25rem;
  }

  &__timestamp {
    display: inline-block;
    height: 1.25rem;
    color: var(--chat-text-muted);
    font-size: 0.75rem;
    font-weight: var(--font-weight-medium);
    line-height: 1.375rem;
    vertical-align: baseline;
    cursor: default;
    pointer-events: none;
    margin-inline-start: 0.25rem;
  }

  &__content {
    color: var(--text-default);
    font-size: 1rem;
    line-height: 1.375rem;
    white-space: break-spaces;
    overflow-wrap: break-word;
  }
}
</style>
