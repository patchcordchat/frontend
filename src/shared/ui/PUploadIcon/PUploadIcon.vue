<template>
  <div class="p-upload-icon">
    <div class="p-upload-icon__icon-container">
      <img v-if="previewUrl" class="p-upload-icon__filled-icon" :src="previewUrl" alt="Your icon" />
      <p-icon v-else class="p-upload-icon__icon" icon="feature.upload-icon" />

      <input
        class="p-upload-icon__input"
        :accept="props.acceptTypes.join(',')"
        type="file"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PIcon from '../PIcon'

interface Props {
  maxSize?: number
  acceptTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  maxSize: 5 * 1024 * 1024,
  acceptTypes: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
})

const emit = defineEmits<{
  (e: 'upload', file: File, base64: string): void
  (e: 'error', error: string): void
}>()

const previewUrl = ref<string>('')

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    emit('error', 'Файл не выбран')
    return
  }

  if (!props.acceptTypes.includes(file.type)) {
    emit('error', `Недопустимый тип файла`)
    return
  }
  if (file.size > props.maxSize) {
    emit('error', `Файл слишком большой`)
    return
  }

  const reader = new FileReader()

  reader.onload = (e) => {
    const base64 = e.target?.result as string

    previewUrl.value = base64
    emit('upload', file, base64)
  }

  reader.onerror = () => {
    emit('error', 'Ошибка при чтении файла')
  }

  reader.readAsDataURL(file)

  target.value = ''
}
</script>

<style scoped lang="scss">
.p-upload-icon {
  display: flex;
  justify-content: center;
  padding-top: var(--space-xxs);
  color: var(--interactive-text-default);

  &__icon-container {
    position: relative;
    width: 5rem;
    height: 5rem;
  }

  &__icon {
    width: 5rem;
    height: 5rem;
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__filled-icon {
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
    background-color: var(--background-modifier-normal);
  }
}
</style>
