<template>
  <div class="message-skeleton">
    <div class="message-skeleton__contents">
      <p-skeleton
        class-name="message-skeleton__avatar"
        height="2.5rem"
        width="2.5rem"
        border-radius="50%"
        opacity="0.08"
      />

      <h3 class="message-skeleton__header">
        <p-skeleton :width="`${getRandomNumber(2, 8, 'float')}rem`" opacity="0.15" />
      </h3>

      <div class="message-skeleton__content" v-for="i in getRandomNumber(1, 4, 'int')" :key="i">
        <p-skeleton
          v-for="i in getRandomNumber(2, 8, 'int')"
          :key="i"
          :width="`${getRandomNumber(2, 5, 'float')}rem`"
          opacity="0.06"
        />
      </div>
    </div>

    <div v-if="getRandomNumber(0, 2, 'int')" class="message-skeleton__attachments">
      <p-skeleton
        :width="`${getRandomNumber(8, 16, 'float')}rem`"
        :height="`${getRandomNumber(6, 20, 'float')}rem`"
        opacity="0.03"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PSkeleton } from '@/shared/ui'

function getRandomNumber<T extends 'int' | 'float' = 'int'>(
  min: number = 0,
  max: number = 100,
  type: T = 'int' as T,
): T extends 'int' ? number : number {
  const random = Math.random() * (max - min) + min

  if (type === 'int') {
    return Math.floor(random) as T extends 'int' ? number : number
  } else {
    return random as T extends 'int' ? number : number
  }
}
</script>

<style scoped lang="scss">
.message-skeleton {
  position: relative;
  overflow: hidden;
  min-height: 2.75rem;
  margin-top: 1rem;
  box-sizing: border-box;
  overflow-wrap: break-word;
  padding-inline: 4.5rem 1rem;
  user-select: text;
  contain: paint layout;

  &__header {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
    height: 1.375rem;
    line-height: 1.375rem;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    align-items: center;
    overflow: hidden;
    height: 1.375rem;
    text-indent: 0;
  }

  &__avatar {
    position: absolute;
    inset-inline-start: 1rem;
  }
}
</style>
