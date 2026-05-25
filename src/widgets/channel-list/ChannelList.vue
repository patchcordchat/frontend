<template>
  <ul class="channel-list">
    <li class="channel-list__container">
      <list-group name="Текстовые каналы" @create:channel="createModalRef?.open()" />
    </li>

    <li class="channel-list__container" v-for="channel in textChannels" :key="channel.id">
      <server-channel :channel="channel" />
    </li>

    <li class="channel-list__container">
      <list-group name="Голосовые каналы" @create:channel="createModalRef?.open()" />
    </li>

    <li class="channel-list__container" v-for="channel in voiceChannels" :key="channel.id">
      <server-channel :channel="channel" />
    </li>
  </ul>

  <create-channel-modal ref="createModalRef" :server-id="serverId" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ServerChannel } from '@/entities/channel'
import ListGroup from './ListGroup.vue'
import CreateChannelModal from '@/widgets/create-channel-modal'
import { useChannelStore } from '@/entities/channel'
import { useServerStore } from '@/entities/server'

const { activeId: serverId } = storeToRefs(useServerStore())

const { getChannelsByServerId, fetchChannels } = useChannelStore()
const channels = computed(() => getChannelsByServerId(serverId.value))
const textChannels = computed(() => channels.value.filter((ch) => ch.type === 0))
const voiceChannels = computed(() => channels.value.filter((ch) => ch.type === 1))

const createModalRef = ref<InstanceType<typeof CreateChannelModal>>()

onBeforeMount(async () => {
  await fetchChannels(serverId.value)
})

watch(serverId, async (newId) => {
  if (!newId) return
  await fetchChannels(serverId.value)
})
</script>

<style scoped lang="scss">
.channel-list {
  position: relative;
  padding-top: var(--space-sm);

  &__container {
    position: relative;
    transition: opacity .2s ease-in-out;
  }
}
</style>
