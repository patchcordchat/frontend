<template>
  <nav class="servers-nav">
    <ul class="servers-nav__list">
      <list-item type="link" icon="logos.patchcord.symbol" to="/channels/@me" />

      <div class="servers-nav__separator">
        <span></span>
      </div>

      <list-item
        v-for="server in servers"
        :key="server.id"
        :src="server.icon"
        :label="server.name"
        type="link"
        :to="`/channels/${server.id}`"
      />

      <list-item type="button" icon="misc.plus-circle" @click="modalRef?.open()" />

      <p-modal show-close-button ref="modalRef">
        <create-server-form @close="modalRef?.close()" />
      </p-modal>

      <list-item type="link" to="/discovery" icon="misc.compass-circle" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { PModal } from '@/shared/ui'
import CreateServerForm from '@/features/server/create'
import { useServerStore } from '@/entities/server'
import ListItem from './ListItem.vue'

const modalRef = ref<InstanceType<typeof PModal>>()
const serverStore = useServerStore()
const { servers } = storeToRefs(serverStore)

onMounted(async () => {
  await serverStore.fetchServers()
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
