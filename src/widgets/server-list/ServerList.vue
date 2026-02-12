<template>
  <nav class="servers-nav">
    <ul class="servers-nav__list">
      <list-item
        type="link"
        icon="logos.patchcord.symbol"
        label="Личные Сообщения"
        to="/channels/@me"
      />

      <div class="servers-nav__separator">
        <span></span>
      </div>

      <list-item
        v-for="server in servers"
        :key="server.id"
        :src="serverIcon(server.id, server.icon)"
        :label="server.name"
        type="link"
        :to="`/channels/${server.id}`"
      />

      <list-item
        type="button"
        icon="misc.plus-circle"
        label="Добавить Сервер"
        @click="modalRef?.open()"
      />

      <p-modal size="md" padding-size="sm" show-close-button ref="modalRef">
        <create-server-form @close="modalRef?.close()" />
      </p-modal>

      <list-item type="link" icon="misc.compass-circle" label="Путешествие" to="/discovery" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { PModal } from '@/shared/ui'
import CreateServerForm from '@/features/create-server'
import { useServerStore } from '@/entities/server'
import { StoragePaths } from '@/shared/utils'
import { mediaConfig } from '@/shared/config'
import ListItem from './ListItem.vue'

const modalRef = ref<InstanceType<typeof PModal>>()
const serverStore = useServerStore()
const { servers } = storeToRefs(serverStore)

const serverIcon = (serverId: string, iconHash: string | undefined): string | undefined => {
  if (iconHash) {
    return `${mediaConfig.mediaUrl}/${StoragePaths.serverIcon(serverId, iconHash)}`
  }

  return undefined
}

onMounted(async () => {
  await serverStore.fetchMyServers()
})
</script>

<style scoped lang="scss">
.servers-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  width: 4.5rem;
  margin-bottom: 4rem;
  background-color: var(--background-base-lowest);
  mask:
    linear-gradient(180deg, #000, transparent) bottom / 100% 16px no-repeat,
    linear-gradient(#000, #000) top / 100% calc(100% - 15px) no-repeat;

  &__separator {
    position: relative;
    display: flex;
    justify-content: center;
    width: 4.5rem;
    margin: 0;

    span {
      width: 2rem;
      height: 1px;
      background-color: var(--opacity-12);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
}
</style>
