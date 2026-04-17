<template>
  <form class="message-form">

    <attachment-area />

    <div class="message-form__inner">
      <upload-input ref="uploadRef" @select="handleFileSelection" />

      <attach-action @click="uploadRef?.open()" />

      <p-textarea v-model="content" @submit="handelSubmit" :placeholder="`Написать #${activeChannel?.name}`" />

      <action-toolbar />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PTextarea } from '@/shared/ui'
import ActionToolbar from './ActionToolbar.vue'
import AttachAction from './AttachAction.vue'
import UploadInput from './UploadInput.vue'
import AttachmentArea from './AttachmentArea.vue'
import { useCreateMessageForm } from '../model'
import { useChannelStore } from '@/entities/channel'
import { storeToRefs } from 'pinia'

const { activeChannel } = storeToRefs(useChannelStore())
const uploadRef = ref<InstanceType<typeof UploadInput> | null>(null);

const { content, onSubmit, isSubmitting } = useCreateMessageForm()

const handleFileSelection = (files: FileList) => {
  console.log(files);

  // Array.from(files).forEach(file => uploadFile(file));
};

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
}
</style>
