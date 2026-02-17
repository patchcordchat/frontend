<template>
  <div class="message-feed">
    <div class="message-feed__scroller">
      <div class="message-feed__scroller-content">
        <ol v-if="!isLoading" class="message-feed__scroller-inner">
          <li v-for="message in messages" :key="message.id">
            <message-card />
          </li>
        </ol>
        <div v-else>
          Loading...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MessageCard, messageApi } from '@/entities/message'

const isLoading = ref(false);
const messages = ref();

onMounted(async () => {
  const { data } = await messageApi.fetchMessages('69830b8699aa646fc011a4f2')

  messages.value = data;
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
