import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { channelApi } from '../api/channel.api'
import type { Channel, CreateChannelDto } from './channel.types'

export const useChannelStore = defineStore('channel', () => {
  // State
  const channels = reactive<Record<string, Channel[]>>({})

  // Getters
  const getChannelsByServerId = (serverId: string) => channels[serverId] ?? []

  // Actions
  /**
   * Получить каналы сервера
   */
  const fetchChannels = async (serverId: string) => {
    try {
      const { data } = await channelApi.fetchChannels(serverId)

      channels[serverId] = data
    } catch (err) {
      console.error('Error fetching channels:', err)
      throw err
    }
  }

  /**
   * Создать новый канал
   */
  const createChannel = async (serverId: string, payload: CreateChannelDto) => {
    try {
      const { data: newChannel } = await channelApi.createChannel(serverId, payload)
      addChannel(serverId, newChannel)

      return newChannel
    } catch (err) {
      console.error('Error creating channel:', err)
      throw err
    }
  }

  /**
   * Обновить канал
   */
  const updateServer = async (serverId: string, channelId: string, payload: Partial<Channel>) => {
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
      console.error('Error updating channel:', err)
      throw err
    }
  }

  /**
   * Удалить канал
   */
  const deleteChannel = async (serverId: string, channelId: string) => {
    try {
      await channelApi.deleteChannel(serverId, channelId)

      removeChannel(serverId, channelId)
    } catch (err) {
      console.error('Error deleting channel:', err)
      throw err
    }
  }

  // Helpers
  /**
   * Добавить канал в state
   */
  function addChannel(serverId: string, channel: Channel) {
    if (!channels[serverId]) {
      channels[serverId] = []
    }
    channels[serverId].push(channel)
  }

  /**
   * Удалить канал из state
   */
  function removeChannel(serverId: string, channelId: string) {
    if (channels[serverId]) {
      channels[serverId] = channels[serverId].filter((ch) => ch._id !== channelId)
    }
  }

  /**
   * Сбросить state
   */
  const $reset = () => {
    Object.entries(channels).forEach(([serverId]) => {
      delete channels[serverId]
    })
  }

  return {
    // State
    channels,

    // Getters
    getChannelsByServerId,

    // Actions
    fetchChannels,
    createChannel,
    updateServer,
    deleteChannel,
    $reset,
  }
})
