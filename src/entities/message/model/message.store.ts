import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { messageApi } from '../api/message.api'
import type { CreateMessageDto, Message } from './message.types'

export const useMessageStore = defineStore('message', () => {
  // State
  const messages = reactive<Record<string, Record<string, Message>>>({})

  // Getters
  const getMessages = (channelId: string): Message[] => {
    return Object.values(messages[channelId] || {})
  }

  // Actions
  /**
   * Загрузить список сообщений для канала
   */
  const fetchMessages = async (channelId: string) => {
    try {
      const { data } = await messageApi.fetchMessages(channelId)

      if (!messages[channelId]) {
        messages[channelId] = {}
      }
      const channelMessages = messages[channelId]

      data.forEach((message) => (channelMessages[message.id] = message))
    } catch (err) {
      console.error('Error fetching messages:', err)
      throw err
    }
  }

  /**
   * Загрузить сообщение по ID
   */
  const fetchMessageById = async (channelId: string, messageId: string) => {
    try {
      const { data: message } = await messageApi.fetchMessageById(channelId, messageId)

      if (!messages[channelId]) {
        messages[channelId] = {}
      }
      const channelMessages = messages[channelId]

      channelMessages[message.id] = message
    } catch (err) {
      console.error('Error fetching message:', err)
      throw err
    }
  }

  /**
   * Создать новое сообщение
   */
  const createMessage = async (channelId: string, payload: CreateMessageDto) => {
    try {
      const { data: newMessage } = await messageApi.createMessage(channelId, payload)

      if (!messages[channelId]) {
        messages[channelId] = {}
      }
      const channelMessages = messages[channelId]

      channelMessages[newMessage.id] = newMessage
    } catch (err) {
      console.error('Error creating message:', err)
      throw err
    }
  }

  /**
   * Обновить сообщение
   */
  const updateMessage = async (
    channelId: string,
    messageId: string,
    payload: Partial<CreateMessageDto>,
  ) => {
    try {
      const { data: updatedMessage } = await messageApi.updateMessage(channelId, messageId, payload)

      if (!messages[channelId]) {
        messages[channelId] = {}
      }

      const channelMessages = messages[channelId]

      channelMessages[updatedMessage.id] = updatedMessage
    } catch (err) {
      console.error('Error updating server:', err)
      throw err
    }
  }

  /**
   * Удалить сообщение
   */
  const deleteMessage = async (channelId: string, messageId: string) => {
    try {
      await messageApi.deleteMessage(channelId, messageId)

      if (!messages[channelId]) {
        return Promise.resolve()
      }
      const channelMessages = messages[channelId]

      delete channelMessages[messageId]
    } catch (err) {
      console.error('Error deleting server:', err)
      throw err
    }
  }

  /**
   * Сбросить state
   */
  const $reset = () => {
    Object.entries(messages).forEach(([id]) => {
      delete messages[id]
    })
  }

  return {
    // State
    messages,

    // Getters
    getMessages,

    // Actions
    fetchMessages,
    fetchMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
    $reset,
  }
})
