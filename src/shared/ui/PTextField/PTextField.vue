<template>
  <div :class="classes">
    <p-label
      v-if="props.label"
      :text="props.label"
      :required="props.required"
      :size="props.size"
      :for="id"
    />
    <div class="p-text-field__input-wrapper">
      <p-input
        class="p-text-field__input"
        :placeholder="props.placeholder"
        :required="props.required"
        :id="id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PInput from '../PInput/PInput.vue'
import PLabel from '../PLabel/PLabel.vue'
import { useId } from 'vue'

type InputSize = 'sm' | 'md'

interface Props {
  label?: string
  placeholder?: string
  size?: InputSize
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  required: false,
})

const classes = {
  'p-text-field': true,
  [`p-text-field--size-${props.size}`]: true,
}

const id = useId()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-text-field {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);

  &__input-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xxs);
    height: var(--input-height);
    color: var(--input-text);
    border-width: 1px;
    border-style: solid;
    border-color: var(--input-border);
    border-radius: var(--radius-sm);
    background-color: var(--input-background);
    transition: border-color 0.1s ease;

    &:hover {
      --input-border: var(--input-border-default-hover);
    }

    &:has(input:focus) {
      border-color: var(--input-border-active);
    }
  }

  &__input {
    padding-inline: 10px;

    &::placeholder {
      color: var(--input-placeholder-text);
    }
  }

  &--size {
    &-sm {
      @include mixins.text-sm-normal;

      --input-height: var(--input-height-sm);
    }

    &-md {
      @include mixins.text-md-normal;

      --input-height: var(--input-height-md);
    }
  }
}
</style>
