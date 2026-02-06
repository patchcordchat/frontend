<template>
  <form class="message-form">
    <div class="message-form__inner">
      <div class="message-form__attach-wrapper">
        <div class="message-form__attach-button">
          <p-icon icon="misc.plus-large" />
        </div>
      </div>

      <textarea class="message-form__textarea" style="height: 56px"></textarea>

      <div class="message-form__buttons">
        <div class="message-form__attach-button">
          <p-icon icon="misc.cross" />
        </div>

        <div class="message-form__attach-button">
          <p-icon icon="misc.cross" />
        </div>

        <div class="message-form__attach-button">
          <p-icon icon="misc.cross" />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
</script>

<style scoped lang="scss">
.message-form {
  position: relative;
  flex-shrink: 0;
  margin-top: -1rem;
  padding-inline: var(--space-xs);
  padding-inline-start: calc(var(--space-md) - 1px);

  &__inner {
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: var(--space-xs);
    text-indent: 0;
    border: 1px solid var(--border-muted);
    border-radius: var(--radius-sm);
    background: var(--chat-background-default);
    transition: border-color 0.2s ease;
    padding-inline-start: calc(var(--space-md) - 1px);
  }

  &__attach-wrapper {
    position: sticky;
    flex: 0 0 auto;
    align-self: stretch;
    padding: var(--space-sm) calc(var(--space-md) - 6px);
  }

  &__attach-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0.375rem;
    box-sizing: border-box;
    color: var(--interactive-text-default);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition-duration: 0.2s;
    margin-inline: -0.875rem 0.625rem;
  }

  &__textarea {
    width: 100%;
  }

  &__buttons {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    gap: var(--space-xs);
    align-items: center;
    height: 3.5rem;
    margin-inline-end: 0.375rem;
  }
}
</style>
