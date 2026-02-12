<template>
  <section class="chat-header">
    <div class="chat-header__channel">
      <div class="chat-header__channel-icon">
        <p-icon icon="misc.hashtag" />
      </div>

      <h1 class="chat-header__channel-name">general</h1>
    </div>

    <div class="chat-header__toolbar">
      <p-icon icon="misc.bell" size="md" />

      <p-icon icon="misc.pin" size="md" />

      <p-icon icon="misc.users" size="md" />

      <div class="chat-header__search"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.chat-header {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 3rem;
  min-height: 3rem;
  padding: var(--space-xs);
  color: var(--text-default);
  font-size: 1rem;
  line-height: 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--background-base-lower);
  cursor: default;
  -webkit-padding-end: var(--space-xs);
  padding-inline: var(--space-md) var(--space-xs);
  -webkit-padding-start: var(--space-md);

  &__channel {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    overflow: hidden;
    min-width: 0;
  }

  &__channel-icon {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 2rem;
    margin-inline: -1px calc(var(--space-xs) / 2 + 1px);

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--channel-icon);
    }
  }

  &__channel-name {
    @include mixins.text-md-medium;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    color: var(--text-strong);
    white-space: nowrap;
  }
}
</style>
