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
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonView =
  | 'danger'
  | 'positive'
  | 'secondary'
  | 'transparent'
  | 'filled-brand'
  | 'filled-brand-inverted'
  | 'filled-white'
  | 'outline-brand'
  | 'outline-danger'
  | 'outline-positive'
  | 'outline-primary'

type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'

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
  size: 'm',
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
  --height: 40px;
  --border-width: 0;
  --border-radius: 9999px;
  --text-color: var(--text-primary);
  --text-color-hover: var(--text-primary);
  --text-color-disabled: var(--text-color);
  --background-color: transparent;
  --background-color-hover: transparent;
  --background-color-disabled: transparent;
  --border-color-disabled: transparent;
  --transform: scale(1);
  --transform-hover: scale(1);
  --border-color: var(--border-primary);
  --font-size: 0.875rem;
  --padding: 0.5rem 1.25rem;
  --icon-offset: 0.25rem;
  --width: fit-content;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min-content;
  max-height: min-content;
  box-sizing: border-box;
  color: inherit;
  font-size: medium;
  font-weight: 400;
  text-align: start;
  border: 1px solid transparent;
  border-color: transparent;
  border-radius: var(--radius-sm);
  background: var(--background-color);
  background-color: initial;
  cursor: pointer;

  &:hover {
    color: var(--text-color-hover);
    background-color: var(--background-color-hover);
    transform: var(--transform-hover);
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

    &-transparent {
      --background-color: var(--button-transparent-background);
      --background-color-active: var(--button-transparent-background-active);
      --background-color-hover: var(--button-transparent-background-hover);
      --text-color: var(--button-transparent-text);
    }

    &-filled-brand {
      --background-color: var(--button-filled-brand-background);
      --background-color-active: var(--button-filled-brand-background-active);
      --background-color-hover: var(--button-filled-brand-background-hover);
      --border-color: var(--button-filled-brand-border);
      --text-color: var(--button-filled-brand-text);
    }

    &-filled-brand-inverted {
      --background-color: var(--button-filled-brand-inverted-background);
      --background-color-active: var(--button-filled-brand-background-active);
      --background-color-hover: var(--button-filled-brand-inverted-background-hover);
      --text-color: var(--button-filled-brand-inverted-text);
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
    }

    &-outline-danger {
      --background-color: var(--button-outline-danger-background);
      --background-color-active: var(--button-outline-danger-background-active);
      --background-color-hover: var(--button-outline-danger-background-hover);
      --border-color: var(--button-outline-danger-border);
    }

    &-outline-positive {
      --background-color: var(--button-outline-danger-background);
      --background-color-active: var(--button-outline-danger-background-active);
      --background-color-hover: var(--button-outline-danger-background-hover);
      --border-color: var(--button-outline-danger-border);
    }
  }

  &--width {
    &-auto {
      --width: fit-content;

      max-width: 100%;
    }

    &-max {
      --width: 100%;
    }
  }
}
</style>
