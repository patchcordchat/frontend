<template>
  <div class="message-feed">
    <div class="message-feed__scroller">
      <div class="message-feed__scroller-content">
        <transition name="fade" mode="out-in">
          <ol v-if="!isLoading" class="message-feed__scroller-inner">
            <li v-for="message in messages" :key="message.id">
              <message-card :message="message" />
            </li>
          </ol>

          <ol v-else class="message-feed__scroller-inner">
            <li v-for="i in 20" :key="i">
              <message-card-skeleton />
            </li>
          </ol>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { MessageCard, MessageCardSkeleton, useMessageStore } from '@/entities/message'
import { useChannelStore } from '@/entities/channel'

const { activeId: channelId } = storeToRefs(useChannelStore())
const { fetchMessages, getMessages } = useMessageStore()

const isLoading = ref(true);

const messages = computed(() => getMessages(channelId.value))

watch(channelId, async (newChannelId) => {
  if (!newChannelId) return

  isLoading.value = true
  await fetchMessages(newChannelId)

  isLoading.value = false
})

onMounted(async () => {
  await fetchMessages(channelId.value)

  isLoading.value = false
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.message-feed {
  position: relative;
  z-index: 0;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;

  &__scroller {
    @include mixins.scrollbar-thin;

    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden scroll;
    min-height: 0;
    box-sizing: border-box;
    inset-inline: 0;
  }

  &__scroller-content {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
    justify-content: flex-end;
    min-height: 100%;
    overflow-anchor: none;
  }

  &__scroller-inner {
    overflow: hidden;
    min-height: 0;
    padding-bottom: 2.5rem;
  }
}
</style>
