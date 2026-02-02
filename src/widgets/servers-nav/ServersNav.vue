<template>
  <nav class="servers-nav">
    <ul class="servers-nav__list">
      <list-item type="link" icon="logos.patchcord.symbol" to="/channels/@me" />

      <div class="servers-nav__separator">
        <span></span>
      </div>

      <list-item
        src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
        type="link"
        to="/channels/1/1"
      />

      <list-item
        src="https://distribution.faceit-cdn.net/images/5491f40f-c2d2-40f6-961a-e2c95a9a2279.jpg"
        type="link"
        to="/channels/2/1"
      />

      <list-item type="button" icon="misc.plus-circle" @click="modalRef?.open()" />

      <p-modal ref="modalRef">
        <create-server-form />
      </p-modal>

      <list-item type="link" to="/discovery" icon="misc.compass-circle" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PModal } from '@/shared/ui'
import CreateServerForm from '@/features/server/create'
import ListItem from './ListItem.vue'

const modalRef = ref<InstanceType<typeof PModal>>()
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
