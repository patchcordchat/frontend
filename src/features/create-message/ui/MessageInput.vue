<template>
  <div class="input-wrapper">
    <textarea
      ref="textareaRef"
      class="textarea"
      :value="modelValue"
      @input="handleInput"
      @keydown="handleKeydown"
      placeholder="Напишите сообщение..."
      rows="1"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const MAX_HEIGHT = 563

const adjustHeight = () => {
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'

  const newHeight = textarea.scrollHeight

  if (newHeight <= MAX_HEIGHT) {
    textarea.style.overflowY = 'hidden'
    textarea.style.height = `${newHeight}px`
  } else {
    textarea.style.overflowY = 'auto'
    textarea.style.height = `${newHeight}px`
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  adjustHeight()
}

const handleKeydown = (event: KeyboardEvent) => {
  const isEnter = event.key === 'Enter' && !event.shiftKey
  const isCtrlEnter = event.key === 'Enter' && (event.ctrlKey || event.metaKey)

  if (isEnter || isCtrlEnter) {
    event.preventDefault()

    if (props.modelValue.trim()) {
      emit('submit', props.modelValue)
      emit('update:modelValue', '')

      nextTick(() => {
        adjustHeight()
      })
    }
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(adjustHeight)
  },
)

onMounted(() => {
  adjustHeight()
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.input-wrapper {
  display: flex;
  flex: 1 1 auto;
  padding: calc((3.5rem - 1.375rem) / 2) 0;
}

.textarea {
  @include mixins.text-md-normal;

  width: 100%;
  min-height: 1.375rem;
  max-height: 35.188rem;
  color: inherit;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: none;
  background: transparent;
  outline: none;
  resize: none;

  &::placeholder {
    color: var(--channel-text-area-placeholder);
  }
}
</style>
