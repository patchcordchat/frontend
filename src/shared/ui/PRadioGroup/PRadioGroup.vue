<template>
  <div class="p-radio-group" :class="[`p-radio-group--${direction}`]" role="radiogroup">
    <div class="p-radio-group__label-container">
      <label class="p-radio-group__label">{{ props.label }}</label>
    </div>

    <div class="p-radio-group__options">
      <p-radio
        v-for="option in options"
        :key="getKey(option)"
        v-model="model"
        :value="option.value"
        :name="props.name"
        :icon="option.icon"
        :label="option.label"
        :description="option.description"
        :disabled="props.disabled || option.disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import PRadio from '../PRadio'

export interface RadioOption<V> {
  label: string
  value: V
  description?: string
  disabled?: boolean
  icon?: string
}

interface Props {
  options: RadioOption<T>[]
  name?: string
  label?: string
  direction?: 'vertical' | 'horizontal'
  disabled?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  name: () => `radio-group-${Math.random().toString(36).substring(2, 9)}`,
})

const model = defineModel<T>()

const getKey = (option: RadioOption<T>) => {
  if (typeof option.value === 'object') {
    return JSON.stringify(option.value)
  }
  return option.value as string | number
}
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-radio-group {
  --custom-description-max-width: 70ch;

  flex-grow: 1;
  interpolate-size: allow-keywords;

  &__label-container {
    display: flex;
    flex-direction: column;
    grid-area: labels;
    gap: var(--space-xxs);
    min-width: 0;
    margin-bottom: var(--space-xs);
  }

  &__label {
    @include mixins.text-md-medium;

    color: var(--text-strong);
  }

  &__options {
    display: flex;
    flex-direction: column;
    grid-area: options;
    gap: var(--space-md);
    min-width: 0;
    padding: var(--space-xs) 0 var(--space-xxs);
    box-sizing: border-box;
  }
}
</style>
