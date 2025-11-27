<template>
  <label class="p-checkbox">
    <input class="p-checkbox__input" type="checkbox" v-model="model" />
    <div :class="['p-checkbox__indicator', { 'p-checkbox__indicator--checked': model }]">
      <p-icon v-if="model" class="p-checkbox__icon" icon="misc.check" />
    </div>
    <div v-if="props.label" class="p-checkbox__label">{{ props.label }}</div>
  </label>
</template>

<script setup lang="ts">
import PIcon from '../PIcon/PIcon.vue'

interface Props {
  label?: string
}

const props = withDefaults(defineProps<Props>(), {})

const model = defineModel<boolean>()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-checkbox {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  max-width: 100%;

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: pointer;
  }

  &__indicator {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: var(--checkbox-border-default);
    border-radius: var(--radius-xs);
    background-color: var(--checkbox-background-default);

    &--checked {
      border-color: var(--checkbox-border-checked);
      background-color: var(--checkbox-background-checked);
    }
  }

  &__label {
    @include mixins.text-xs-normal;

    flex: 1 1 auto;
    padding-left: var(--space-xs);
    color: var(--text-muted);
    cursor: pointer;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
