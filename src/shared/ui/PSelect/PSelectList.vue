<template>
  <ul class="p-select-list">
    <li v-for="index in 10" :key="index" class="p-select-list__item" @click="select(index)">
      {{ index }}
      <p-icon
        v-if="selected === index"
        class="p-select-list__selected-indicator"
        icon="misc.rounded-check"
        size="sm"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PIcon from '../PIcon/PIcon.vue'

const selected = ref<number | null>(null)

const select = (index: number) => {
  console.log(index)
  selected.value = index
}
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-select-list {
  @include mixins.scrollbar-thin;

  overflow: hidden scroll;
  max-height: 16.625rem;
  border-width: 1px;
  border-style: solid;
  border-color: var(--border-subtle);
  border-radius: var(--radius-sm);
  background: var(--background-base-lower);

  &__item {
    @include mixins.text-md-normal;

    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: var(--space-sm);
    color: var(--text-secondary);
    cursor: pointer;
  }

  &__selected-indicator {
    color: var(--brand-500);
  }
}
</style>
