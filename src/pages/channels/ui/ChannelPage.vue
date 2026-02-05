<template>
  <div class="channel-page">
    <div class="channel-page__subtitle-container">
      <chat-header />
    </div>

    <div class="channel-page__content">
      <main>
        <message-feed />

        <message-form />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatHeader from '@/widgets/chat-header'
import MessageFeed from '@/widgets/message-feed'
import MessageForm from '@/features/send-message'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.channel-page {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  background: var(--background-base-lower);

  &__title {
    position: relative;
    z-index: 2;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    width: 100%;
    min-width: 0;
    height: 3rem;
    min-height: 3rem;
    padding: var(--space-xs);
    color: var(--text-default);
    font-size: 1rem;
    line-height: 1.25rem;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--background-base-lower);
    cursor: default;
    -webkit-padding-end: var(--space-xs);
    padding-inline: var(--space-md) var(--space-xs);
    -webkit-padding-start: var(--space-md);
  }

  &__channel-icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 2rem;
    margin-inline: -1px calc(var(--space-xs) / 2 + 1px);

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--channel-icon);
    }
  }

  &__channel-name {
    @include mixins.text-md-medium;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    color: var(--text-strong);
    white-space: nowrap;
  }
}
</style>
