<template>
  <div class="channel-page">
    <div class="channel-page__subtitle-container">
      <channel-header />
    </div>

    <div class="channel-page__content">
      <channel-chat v-if="channel?.type == ChannelTypes.TEXT" />

      <channel-call v-else-if="channel?.type == ChannelTypes.VOICE" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import ChannelHeader from '@/widgets/channel-header'
import ChannelChat from '@/widgets/channel-chat';
import ChannelCall from '@/widgets/channel-call';
import { useChannelStore, ChannelTypes } from '@/entities/channel';

const { getChannelById } = useChannelStore()

const route = useRoute()
const channelId = computed(() => route.params.channelId as string)

const channel = computed(() => getChannelById(channelId.value))
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.channel-page {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  background: var(--background-base-lower);

  &__content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    background: var(--background-base-lower);
  }
}
</style>
