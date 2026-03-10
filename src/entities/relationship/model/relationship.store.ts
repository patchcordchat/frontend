import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { relationshipApi } from '../api/relationship.api'
import type { Relationship } from './relationship.types'

export const useRelationshipStore = defineStore('relationship', () => {
  // State
  const relationships = reactive<Record<string, Relationship>>({})

  const fetchRelationships = async () => {
    try {
      const { data } = await relationshipApi.fetchRelationships()

      data.forEach((rel: Relationship) => {
        relationships[rel.id] = rel
      })
    } catch (err) {
      console.error('Error fetching relationships:', err)
      throw err
    }
  }

  const createRelationship = async (userId: string, payload: { type: number }) => {
    try {
      await relationshipApi.createRelationship(userId, payload)
    } catch (err) {
      console.error('Error creating relationship:', err)
      throw err
    }
  }

  const updateRelationship = async (userId: string, payload: { nickname: string }) => {
    try {
      await relationshipApi.updateRelationship(userId, payload)
    } catch (err) {
      console.error('Error updating relationship:', err)
      throw err
    }
  }

  const deleteRelationship = async (userId: string) => {
    try {
      await relationshipApi.deleteRelationship(userId)
    } catch (err) {
      console.error('Error deleting relationship:', err)
      throw err
    }
  }

  const bulkDeleteRelationships = async () => {
    try {
      await relationshipApi.bulkDeleteRelationships()
    } catch (err) {
      console.error('Error bulk deleting relationships:', err)
      throw err
    }
  }

  const bulkAddRelationships = async (payload: { userIds: string[] }) => {
    try {
      await relationshipApi.bulkAddRelationships(payload)
    } catch (err) {
      console.error('Error bulk adding relationships:', err)
      throw err
    }
  }

  const createFriendRequest = async (payload: { username: string }) => {
    try {
      await relationshipApi.createFriendRequest(payload)
    } catch (err) {
      console.error('Error creating friend request:', err)
      throw err
    }
  }

  const ignoreUser = async (userId: string) => {
    try {
      await relationshipApi.ignoreUser(userId)
    } catch (err) {
      console.error('Error ignoring user:', err)
      throw err
    }
  }

  const unignoreUser = async (userId: string) => {
    try {
      await relationshipApi.unignoreUser(userId)
    } catch (err) {
      console.error('Error unignoring user:', err)
      throw err
    }
  }

  return {
    // State
    relationships,

    // Actions
    fetchRelationships,
    createRelationship,
    updateRelationship,
    deleteRelationship,
    bulkDeleteRelationships,
    bulkAddRelationships,
    createFriendRequest,
    ignoreUser,
    unignoreUser,
  }
})
