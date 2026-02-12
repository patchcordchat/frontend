import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { channelApi } from '../api/channel.api'
import type { Channel, CreateChannelDto } from './channel.types'

export const useChannelStore = defineStore('channel', () => {
  // State
  const channels = reactive<Record<string, Channel[]>>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getChannelsByServerId = (serverId: string) => channels[serverId] ?? []

  // Actions
  async function fetchChannels(serverId: string) {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await channelApi.fetchChannels(serverId)

      channels[serverId] = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки каналов'
      console.error('Error fetching channels:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function createChannel(serverId: string, payload: CreateChannelDto) {
    isLoading.value = true
    error.value = null

    try {
      const { data: newChannel } = await channelApi.createChannel(serverId, payload)
      addChannel(serverId, newChannel)

      return newChannel
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка создания канала'
      console.error('Error creating channel:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Обновить канал
   */
  async function updateServer(serverId: string, channelId: string, payload: Partial<Channel>) {
    isLoading.value = true
    error.value = null

    try {
      const { data: updatedChannel } = await channelApi.updateChannel(channelId, payload)

      // Обновить в списке
      const serverChannel = channels[serverId]
      if (serverChannel) {
        const index = serverChannel.findIndex((ch) => ch._id === channelId)
        if (index !== -1) {
          serverChannel[index] = updatedChannel
        }
      }

      return updatedChannel
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка обновления канала'
      console.error('Error updating channel:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteChannel(serverId: string, channelId: string) {
    isLoading.value = true
    error.value = null

    try {
      await channelApi.deleteChannel(serverId, channelId)

      // Удалить из списка
      removeChannel(serverId, channelId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка удаления канала'
      console.error('Error deleting channel:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function addChannel(serverId: string, channel: Channel) {
    if (!channels[serverId]) {
      channels[serverId] = []
    }
    channels[serverId].push(channel)
  }

  function removeChannel(serverId: string, channelId: string) {
    if (channels[serverId]) {
      channels[serverId] = channels[serverId].filter((ch) => ch._id !== channelId)
    }
  }

  return {
    // State
    channels,
    isLoading,
    error,

    // Getters
    getChannelsByServerId,

    // Actions
    fetchChannels,
    createChannel,
    updateServer,
    deleteChannel,
  }
})
