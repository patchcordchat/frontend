<template>
  <div class="message-feed">
    <div class="message-feed__scroller">
      <div class="message-feed__scroller-content">
        <transition name="fade" mode="in-out">
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
import { useRoute } from 'vue-router'
import { MessageCard, MessageCardSkeleton, messageApi } from '@/entities/message'

const isLoading = ref(true);
const messages = ref();

const route = useRoute()
const channelId = computed(() => route.params.channelId as string)

onMounted(async () => {
  const { data } = await messageApi.fetchMessages(channelId.value)

  isLoading.value = false
  messages.value = data
})

watch(channelId, async (newChannelId) => {
  isLoading.value = true
  messages.value = undefined

  const { data } = await messageApi.fetchMessages(newChannelId)

  isLoading.value = false
  messages.value = data
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
    flex-direction: column;
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
