<template>
  <ul class="channel-list">
    <list-group name="Текстовые каналы" @create:channel="createModalRef?.open()" />

    <list-item v-for="channel in textChannels" :key="channel._id" :name="channel.name" :id="channel._id"
      :type="channel.type" />

    <list-group name="Голосовые каналы" @create:channel="createModalRef?.open()" />

    <list-item v-for="channel in voiceChannels" :key="channel._id" :name="channel.name" :id="channel._id"
      :type="channel.type" />
  </ul>

  <create-channel-modal ref="createModalRef" :server-id="serverId" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import ListItem from './ListItem.vue'
import ListGroup from './ListGroup.vue'
import CreateChannelModal from '@/widgets/create-channel-modal'
import { useChannelStore } from '@/entities/channel'

const route = useRoute()

const serverId = computed(() => route.params.serverId as string)

const { getChannelsByServerId, fetchChannels } = useChannelStore()
const channels = computed(() => getChannelsByServerId(serverId.value))
const textChannels = computed(() => channels.value.filter((ch) => ch.type === 0))
const voiceChannels = computed(() => channels.value.filter((ch) => ch.type === 1))

const createModalRef = ref<InstanceType<typeof CreateChannelModal>>()

onBeforeMount(async () => {
  await fetchChannels(serverId.value)
})

watch(serverId, async () => {
  await fetchChannels(serverId.value)
})
</script>

<style scoped lang="scss">
.channel-list {
  position: relative;
  padding-top: var(--space-sm);
}
</style>
