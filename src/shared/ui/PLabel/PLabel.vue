<template>
  <div :class="['p-label', `p-label--size-${props.size}`]">
    <label class="p-label__label" :for="props.for">
      {{ props.text }}<span v-if="props.required" class="p-label__required-mark">*</span>
    </label>
  </div>
</template>

<script setup lang="ts">
type LabelSize = 'sm' | 'md'

interface Props {
  text: string
  size?: LabelSize
  required?: boolean
  for?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  required: false,
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-label {
  display: flex;
  flex-direction: column;
  grid-area: labels;
  gap: 0;
  min-width: 0;

  &--size {
    &-sm {
      @include mixins.text-sm-normal;
    }

    &-md {
      @include mixins.text-md-normal;
    }
  }

  &__required-mark {
    @include mixins.text-xs-normal;

    display: inline-block;
    margin-left: var(--space-xxs);
    color: var(--red-500);
  }
}
</style>
