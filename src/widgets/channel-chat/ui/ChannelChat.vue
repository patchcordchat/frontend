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
import { useSocket } from '@/shared/api/socket';
import { useChannelStore } from '@/entities/channel';

const { emit } = useSocket()

const { activeId: channelId } = storeToRefs(useChannelStore())

watch(channelId, async (newChannelId, oldChannelId) => {
  emit('chat:leave', oldChannelId)
  emit('chat:join', newChannelId)
})

onMounted(() => {
  emit('chat:join', channelId.value)
})

onBeforeUnmount(() => {
  emit('chat:leave', channelId.value)
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