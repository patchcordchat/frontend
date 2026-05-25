<template>
  <input class="p-input" :value="model" @input="model = ($event.target as HTMLInputElement).value" />
</template>

<script setup lang="ts">
const model = defineModel<string>()
</script>

<style scoped lang="scss">
.p-input {
  flex: 1;
  min-width: 30%;
  height: 100%;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  border: none;
  background-color: var(--transparent);

  &::placeholder {
    user-select: none;
    color: var(--input-placeholder-text);
  }
}
</style>
