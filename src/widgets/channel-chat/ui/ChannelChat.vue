<template>
  <main class="channel-chat">
    <chat-header />

    <message-feed />

    <create-message-form />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { storeToRefs } from 'pinia';
import MessageFeed from '@/widgets/message-feed'
import ChatHeader from '@/widgets/chat-header'
import CreateMessageForm from '@/features/create-message'
import { useSocketWorker } from '@/shared/api/socket';
import { useChannelStore } from '@/entities/channel';

const { emit } = useSocketWorker()

const { activeId: channelId } = storeToRefs(useChannelStore())

watch(channelId, async (newChannelId, oldChannelId) => {
  emit('channel:leave', oldChannelId)
  emit('channel:join', newChannelId)
})

onMounted(() => {
  emit('channel:join', channelId.value)
})

onBeforeUnmount(() => {
  emit('channel:leave', channelId.value)
})
</script>

<style scoped lang="scss">
.channel-chat {
  position: relative;
  z-index: 0;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
</style>