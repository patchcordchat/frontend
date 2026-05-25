import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'
import { serverApi } from '../api/server.api'
import type { CreateServerDto, Server } from './server.types'

export const useServerStore = defineStore('server', () => {
  const route = useRoute()

  // State
  const servers = reactive<Record<string, Server>>({})
  const activeId = computed<string>(() => route.params.serverId as string)
  const activeServer = computed<Server | undefined>(() => getServerById(activeId.value))

  // Getters
  const getServerById = (id: string): Server | undefined => servers[id]
  const getActiveServer = () => getServerById(activeId.value)

  // Actions
  /**
   * Загрузить список серверов
   */
  const fetchMyServers = async () => {
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
  const fetchServerById = async (id: string) => {
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
  const createServer = async (payload: CreateServerDto) => {
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
  const updateServer = async (id: string, payload: Partial<CreateServerDto>) => {
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
  const deleteServer = async (id: string) => {
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
  const $reset = () => {
    Object.entries(servers).forEach(([id]) => {
      delete servers[id]
    })
  }

  return {
    // State
    servers,
    activeId,
    activeServer,

    // Getters
    getServerById,
    getActiveServer,

    // Actions
    fetchMyServers,
    fetchServerById,
    createServer,
    updateServer,
    deleteServer,
    $reset,
  }
})
