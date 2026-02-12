import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { serverApi } from '../api/server.api'
import type { CreateServerDto, Server } from './server.types'

export const useServerStore = defineStore('server', () => {
  // State
  const servers = reactive<Record<string, Server>>({})

  // Actions
  /**
   * Загрузить список серверов
   */
  async function fetchMyServers() {
    try {
      const { data } = await serverApi.fetchMyServers()
      data.forEach((server) => (servers[server.id] = server))
    } catch (err) {
      console.error('Error fetching servers:', err)
      throw err
    }
  }

  /**
   * Загрузить сервер по ID
   */
  async function fetchServerById(id: string) {
    try {
      const { data: server } = await serverApi.fetchServerById(id)

      servers[id] = server
      return server
    } catch (err) {
      console.error('Error fetching server:', err)
      throw err
    }
  }

  /**
   * Создать новый сервер
   */
  async function createServer(payload: CreateServerDto) {
    try {
      const { data: newServer } = await serverApi.createServer(payload)
      servers[newServer.id] = newServer

      return newServer
    } catch (err) {
      console.error('Error creating server:', err)
      throw err
    }
  }

  /**
   * Обновить сервер
   */
  async function updateServer(id: string, payload: Partial<CreateServerDto>) {
    try {
      const { data: updatedServer } = await serverApi.updateServer(id, payload)

      servers[id] = updatedServer
      return updatedServer
    } catch (err) {
      console.error('Error updating server:', err)
      throw err
    }
  }

  /**
   * Удалить сервер
   */
  async function deleteServer(id: string) {
    try {
      await serverApi.deleteServer(id)

      delete servers[id]
    } catch (err) {
      console.error('Error deleting server:', err)
      throw err
    }
  }

  /**
   * Сбросить состояние
   */
  function $reset() {
    Object.entries(servers).forEach(([id]) => {
      delete servers[id]
    })
  }

  return {
    // State
    servers,

    // Actions
    fetchMyServers,
    fetchServerById,
    createServer,
    updateServer,
    deleteServer,
    $reset,
  }
})
