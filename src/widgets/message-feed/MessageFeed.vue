<template>
  <div class="message-feed">
    <div class="message-feed__scroller">
      <div class="message-feed__scroller-content">
        <ol class="message-feed__scroller-inner">
          <li v-for="i in 20" :key="i">
            <message-card />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCard } from '@/entities/message'
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
