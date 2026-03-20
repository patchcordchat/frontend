<template>
  <nav class="dm-sidebar">
    <div class="dm-sidebar__search-bar">
      <p-button width="max" view="secondary" size="sm">Найти или начать беседу</p-button>
    </div>

    <div class="dm-sidebar__body">

      <ul class="dm-sidebar__channel-list">
        <friends-button />

        <p-section-divider />

        <li v-for="i in 10" :key="i">
          <private-channel :channel="{ id: String(i), name: 'dredhorse5' }" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import FriendsButton from './FriendsButton.vue';
import { PrivateChannel, channelApi } from '@/entities/channel';
import { PButton, PSectionDivider } from '@/shared/ui';

onMounted(() => {
  channelApi.fetchPrivateChannels()
})
</script>

<style scoped lang="scss">
.dm-sidebar {
  &__body {
    padding-top: var(--space-xs);
  }

  &__search-bar {
    position: relative;
    z-index: 2;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    height: 3rem;
    padding: 0 var(--space-xs);
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-subtle);
    box-shadow: none;
  }
}
</style>