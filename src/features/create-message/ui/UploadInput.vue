<template>
    <div class="upload-input">
      <input ref="inputRef" 
        type="file" 
        multiple 
        @change="handleFiles"
      />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{ (e: 'select', files: FileList): void }>();

const handleFiles = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) emit('select', files);
  (e.target as HTMLInputElement).value = '';
};

defineExpose({ open: () => inputRef.value?.click() });
</script>

<style scoped lang="scss">
.upload-input {
  position: relative;
  width: 0;
  height: 0;
  pointer-events: none;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    opacity: 0;
    cursor: pointer;
  }
}
</style>