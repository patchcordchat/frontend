<template>
  <div :class="classes">
    <p-label
      v-if="props.label"
      :text="props.label"
      :required="props.required"
      :size="props.size"
      :for="id"
    />

    <div class="p-text-field__control">
      <div class="p-text-field__input-wrapper">
        <p-input
          class="p-text-field__input"
          v-model="model"
          :placeholder="props.placeholder"
          :required="props.required"
          :autocomplete="props.autocomplete"
          :maxlength="props.maxlength"
          :type="props.type"
          :name="props.name"
          :id="id"
          @blur="emit('blur')"
          @focus="emit('focus')"
        />
      </div>

      <transition name="appear-slide-down" mode="out-in">
        <div class="p-text-field__helper-container" v-if="props.error">
          <p-status-message status="error" :text="props.error" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import PInput from '../PInput/PInput.vue'
import PLabel from '../PLabel/PLabel.vue'
import PStatusMessage from '../PStatusMessage/PStatusMessage.vue'

type InputSize = 'sm' | 'md'

interface Props {
  autocomplete?: string
  placeholder?: string
  maxlength?: string
  required?: boolean
  error?: string
  label?: string
  size?: InputSize
  type?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  required: false,
})

const model = defineModel<string>()

const emit = defineEmits<{
  (e: 'blur'): void
  (e: 'focus'): void
}>()

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

  &__control {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    min-width: 0;
  }

  &__helper-container {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-sm);
    align-items: start;
    min-width: 0;
  }
}
</style>
