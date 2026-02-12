<template>
  <div class="channel-page">
    <div class="channel-page__subtitle-container">
      <channel-header />
    </div>

    <div class="channel-page__content">
      <main class="channel-page__chat-wrapper">
        <message-feed />

        <create-message-form />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChannelHeader from '@/widgets/channel-header'
import MessageFeed from '@/widgets/message-feed'
import CreateMessageForm from '@/features/create-message'
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

  &__content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    background: var(--background-base-lower);
  }

  &__chat-wrapper {
    position: relative;
    z-index: 0;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }
}
</style>
