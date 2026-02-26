<template>
  <form class="message-form">
    <div class="message-form__inner">
      <attach-action />

      <p-textarea v-model="content" @submit="handelSubmit" placeholder="Написать #test" />

      <action-toolbar />
    </div>
  </form>
</template>

<script setup lang="ts">
import { PTextarea } from '@/shared/ui'
import ActionToolbar from './ActionToolbar.vue'
import AttachAction from './AttachAction.vue'
import { useCreateMessageForm } from '../model'

const formApi = useCreateMessageForm()
const { content, onSubmit, isSubmitting } = formApi

const handelSubmit = async (text: string) => {
  if (isSubmitting.value) return

  await onSubmit(text)
  content.value = ''
}
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
}
</style>
