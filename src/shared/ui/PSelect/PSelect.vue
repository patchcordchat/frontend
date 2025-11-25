<template>
  <div class="p-select" @click="open()">
    <span v-if="!model" class="p-select__placeholder">{{ props.placeholder }}</span>
    <span v-else class="p-select__value">{{ model }}</span>
    <div class="p-select__indicator">
      <p-icon class="p-select__icon" :icon="isOpen ? 'misc.chevron-down' : 'misc.chevron-up'" />
    </div>
  </div>

  <p-select-list v-if="isOpen" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PSelectList from './PSelectList.vue'
import PIcon from '../PIcon/PIcon.vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select',
})

const model = defineModel<string>()

const isOpen = ref(false)

const open = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped lang="scss">
.p-select {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-xs);
  align-items: center;
  box-sizing: border-box;
  color: var(--text-default);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-sm);
  background-color: var(--input-background);
  cursor: pointer;
  transition: border-color 0.1s ease;
  padding-block: var(--space-xs);
  padding-inline: var(--space-sm) var(--space-xs);
}
</style>
