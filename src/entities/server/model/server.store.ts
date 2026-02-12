import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { serverApi } from '../api/server.api'
import type { CreateServerDto, Server } from './server.types'

export const useServerStore = defineStore('server', () => {
  // State
  const servers = ref<Server[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const serversList = computed(() => servers.value)

  // Actions
  /**
   * Загрузить список серверов
   */
  async function fetchMyServers() {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await serverApi.fetchMyServers()
      servers.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки серверов'
      console.error('Error fetching servers:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузить сервер по ID
   */
  async function fetchServerById(id: string) {
    isLoading.value = true
    error.value = null

    try {
      const { data: server } = await serverApi.fetchServerById(id)

      // Обновить сервер в списке, если он там есть
      const index = servers.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        servers.value[index] = server
      }

      return server
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки сервера'
      console.error('Error fetching server:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Создать новый сервер
   */
  async function createServer(payload: CreateServerDto) {
    isLoading.value = true
    error.value = null

    try {
      const { data: newServer } = await serverApi.createServer(payload)
      servers.value.push(newServer)

      return newServer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка создания сервера'
      console.error('Error creating server:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Обновить сервер
   */
  async function updateServer(id: string, payload: Partial<CreateServerDto>) {
    isLoading.value = true
    error.value = null

    try {
      const { data: updatedServer } = await serverApi.updateServer(id, payload)

      // Обновить в списке
      const index = servers.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        servers.value[index] = updatedServer
      }

      return updatedServer
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка обновления сервера'
      console.error('Error updating server:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Удалить сервер
   */
  async function deleteServer(id: string) {
    isLoading.value = true
    error.value = null

    try {
      await serverApi.deleteServer(id)

      // Удалить из списка
      servers.value = servers.value.filter((s) => s.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка удаления сервера'
      console.error('Error deleting server:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Очистить ошибку
   */
  function clearError() {
    error.value = null
  }

  /**
   * Сбросить состояние
   */
  function reset() {
    servers.value = []
    isLoading.value = false
    error.value = null
  }

  return {
    // State
    servers,
    isLoading,
    error,

    // Getters
    serversList,

    // Actions
    fetchMyServers,
    fetchServerById,
    createServer,
    updateServer,
    deleteServer,
    clearError,
    reset,
  }
})
