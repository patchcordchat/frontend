<template>
  <component
    :is="tag"
    :href="isLink ? href : undefined"
    :type="!isLink ? type : undefined"
    :target="isLink ? target : undefined"
    :disabled="!isLink ? disabled : undefined"
    :class="classes"
    @click="handleClick"
  >
    <div v-if="slots.default" class="p-button__content-wrapper">
      <slot name="default"></slot>
    </div>

    <span v-if="props.loading" class="p-button__loader"> </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

type ButtonView =
  | 'danger'
  | 'positive'
  | 'secondary'
  | 'filled-brand'
  | 'filled-white'
  | 'outline-brand'
  | 'outline-danger'
  | 'outline-positive'
  | 'outline-primary'

type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

type ButtonWidth = 'auto' | 'max'

interface Props {
  view?: ButtonView
  size?: ButtonSize
  width?: ButtonWidth
  isLink?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  target?: '_blank' | '_self' | '_parent' | '_top'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  view: 'filled-brand',
  size: 'md',
  width: 'auto',
  isLink: false,
  href: '#',
  type: 'button',
  target: '_self',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

const classes = {
  'p-button': true,
  [`p-button--view-${props.view}`]: true,
  [`p-button--size-${props.size}`]: true,
  [`p-button--width-${props.width}`]: true,
  'p-button--loading': props.loading,
}

const tag = computed<string>(() => (props.isLink ? 'a' : 'button'))

const handleClick = (event: MouseEvent) => {
  if (props.disabled && !props.isLink) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style scoped lang="scss">
.p-button {
  --text-color: var(--white);
  --text-color-active: var(--text-color);
  --text-color-hover: var(--text-color);
  --border-color: var(--transparent);
  --border-color-active: var(--border-color);
  --border-color-hover: var(--border-color);
  --background-color-active: var(--background-color);

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width);
  max-height: min-content;
  color: var(--text-color);
  border-width: 1px;
  border-style: solid;
  border-color: var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--background-color);
  color: var(--text-color);
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;

  &:hover {
    background-color: var(--background-color-hover);
    border-color: var(--border-color-hover);
    color: var(--text-color-hover);
  }

  &:active {
    background-color: var(--background-color-active);
    border-color: var(--border-color-active);
    color: var(--text-color-active);
  }

  &:disabled {
    background-color: var(--background-color-disabled);
  }

  &--loading {
    pointer-events: none;
  }

  &--view {
    &-danger {
      --background-color: var(--button-danger-background);
      --background-color-active: var(--button-danger-background-active);
      --background-color-disabled: var(--button-danger-background-disabled);
      --background-color-hover: var(--button-danger-background-hover);
      --border-color: var(--button-danger-border);
    }

    &-positive {
      --background-color: var(--button-positive-background);
      --background-color-active: var(--button-positive-background-active);
      --background-color-disabled: var(--button-positive-background-disabled);
      --background-color-hover: var(--button-positive-background-hover);
      --border-color: var(--button-positive-border);
    }

    &-secondary {
      --background-color: var(--button-secondary-background);
      --background-color-active: var(--button-secondary-background-active);
      --background-color-disabled: var(--button-secondary-background-disabled);
      --background-color-hover: var(--button-secondary-background-hover);
      --text-color: var(--button-secondary-text);
    }

    &-filled-brand {
      --background-color: var(--button-filled-brand-background);
      --background-color-active: var(--button-filled-brand-background-active);
      --background-color-hover: var(--button-filled-brand-background-hover);
      --border-color: var(--button-filled-brand-border);
      --text-color: var(--button-filled-brand-text);
    }

    &-filled-white {
      --background-color: var(--button-filled-white-background);
      --background-color-active: var(--button-filled-white-background-active);
      --background-color-hover: var(--button-filled-white-background-hover);
      --text-color: var(--button-filled-white-text);
    }

    &-outline-brand {
      --background-color: var(--button-outline-brand-background);
      --background-color-active: var(--button-outline-brand-background-active);
      --background-color-hover: var(--button-outline-brand-background-hover);
      --border-color: var(--button-outline-brand-border);
      --border-color-active: var(--button-outline-brand-border-active);
      --border-color-hover: var(--button-outline-brand-border-hover);
      --text-color: var(--button-outline-brand-text);
      --text-color-active: var(--button-outline-brand-text-active);
      --text-color-hover: var(--button-outline-brand-text-hover);
    }

    &-outline-danger {
      --background-color: var(--button-outline-danger-background);
      --background-color-active: var(--button-outline-danger-background-active);
      --background-color-hover: var(--button-outline-danger-background-hover);
      --border-color: var(--button-outline-danger-border);
      --border-color-active: var(--button-outline-danger-border-active);
      --border-color-hover: var(--button-outline-danger-border-hover);
      --text-color: var(--button-outline-danger-text);
      --text-color-active: var(--button-outline-danger-text-active);
      --text-color-hover: var(--button-outline-danger-text-hover);
    }

    &-outline-positive {
      --background-color: var(--button-outline-positive-background);
      --background-color-active: var(--button-outline-positive-background-active);
      --background-color-hover: var(--button-outline-positive-background-hover);
      --border-color: var(--button-outline-positive-border);
      --border-color-active: var(--button-outline-positive-border-active);
      --border-color-hover: var(--button-outline-positive-border-hover);
      --text-color: var(--button-outline-positive-text);
      --text-color-active: var(--button-outline-positive-text-active);
      --text-color-hover: var(--button-outline-positive-text-hover);
    }

    &-outline-primary {
      --background-color: var(--button-outline-primary-background);
      --background-color-active: var(--button-outline-primary-background-active);
      --background-color-hover: var(--button-outline-primary-background-hover);
      --border-color: var(--button-outline-primary-border);
      --border-color-active: var(--button-outline-primary-border-active);
      --border-color-hover: var(--button-outline-primary-border-hover);
      --text-color: var(--button-outline-primary-text);
      --text-color-active: var(--button-outline-primary-text-active);
      --text-color-hover: var(--button-outline-primary-text-hover);
    }
  }

  &--width {
    &-auto {
      --width: fit-content;

      max-width: 100%;
    }

    &-max {
      flex: 1;
      width: 100%;
    }
  }

  &--size {
    &-xxs {
      --size: var(--size-xxs);
      --space-horizontal: var(--space-xxs);
      --space-vertical: var(--space-xxs);
    }

    &-xs {
      --size: var(--size-xs);
      --space-horizontal: var(--space-xxs);
      --space-vertical: var(--space-xs);
    }

    &-sm {
      --size: var(--size-sm);
      --space-horizontal: var(--space-xs);
      --space-vertical: var(--space-sm);
    }

    &-md {
      --size: var(--size-md);
      --space-horizontal: var(--space-xs);
      --space-vertical: var(--space-md);
    }

    &-lg {
      --size: var(--size-lg);
      --space-horizontal: var(--space-sm);
      --space-vertical: var(--space-lg);
    }

    &-xl {
      --size: var(--size-xl);
      --space-horizontal: var(--space-md);
      --space-vertical: var(--space-xl);
    }

    &-xxl {
      --size: var(--size-xxl);
      --space-horizontal: var(--space-lg);
      --space-vertical: var(--space-xxl);
    }
  }

  &__content-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    min-width: var(--size);
    min-height: var(--size);
    padding: calc(var(--space-horizontal) - 1px) calc(var(--space-vertical) - 1px);
  }
}
</style>
