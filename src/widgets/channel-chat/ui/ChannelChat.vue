<template>
  <main class="channel-chat">
    <message-feed />

    <create-message-form />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useRoute } from 'vue-router'
import MessageFeed from '@/widgets/message-feed'
import CreateMessageForm from '@/features/create-message'
import { useSocketWorker } from '@/shared/api/socket';

const { emit } = useSocketWorker()

const route = useRoute()
const channelId = computed(() => route.params.channelId as string)

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