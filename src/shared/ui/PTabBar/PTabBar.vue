<template>
  <div class="p-tab-bar">
    <div v-for="item in props.items" :key="item.value" class="p-tab-bar__item"
      :class="{ [item.class || '']: item.class }" :aria-selected="item.value === model" @click="selectTab(item.value)">
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface TabItem {
  value: string | number;
  label: string;
  class?: string;
}

interface Props {
  items: TabItem[];
}

const model = defineModel<string | number>({ required: true });

const props = defineProps<Props>();

const selectTab = (value: TabItem['value']) => {
  model.value = value;
};
</script>

<style scoped lang="scss">
.p-tab-bar {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  &__item {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-width: 2.5rem;
    min-height: 2rem;
    margin: 0 var(--space-xs);
    padding: var(--space-xxs) var(--space-sm);
    color: var(--text-subtle);
    text-align: center;
    white-space: nowrap;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background-color .3s ease;

    &[aria-selected="true"] {
      color: var(--text-strong);
      background-color: var(--background-modifier-selected);
      cursor: default;
    }

    &:hover {
      background-color: var(--background-modifier-hover);
    }

    &[aria-selected="true"],
    &:hover {
      color: var(--text-strong);
    }
  }
}
</style>