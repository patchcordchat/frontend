<template>
  <label
    class="p-radio"
    :class="{ 'p-radio--disabled': disabled, 'p-radio--selected': isSelected }"
    @click.prevent="toggle"
  >
    <span class="p-radio__input-wrapper">
      <input
        type="radio"
        :name="props.name"
        :value="props.value"
        :checked="isSelected"
        :disabled="props.disabled"
      />
    </span>

    <svg class="p-radio__indicator" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" class="p-radio__base"></circle>
      <circle cx="20" cy="20" r="20" class="p-radio__fill"></circle>
      <circle cx="20" cy="20" r="8" class="p-radio__dot"></circle>
    </svg>

    <div class="p-radio__content">
      <slot name="default">
        <span class="p-radio__label">
          <p-icon v-if="props.icon" :icon="props.icon" class="p-radio__icon" size="xs" />

          <div v-if="props.label">
            {{ props.label }}
          </div>
        </span>

        <div v-if="props.description" class="p-radio__description">
          {{ props.description }}
        </div>
      </slot>
    </div>
  </label>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue'
import PIcon from '../PIcon'

interface Props {
  value?: T
  name?: string
  disabled?: boolean
  label?: string
  icon?: string
  description?: string
}

const props = defineProps<Props>()

const model = defineModel<T>()

const isSelected = computed(() => model.value === props.value)

const toggle = () => {
  if (!props.disabled) {
    model.value = props.value
  }
}
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.p-radio';

@keyframes fill-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  1% {
    opacity: 1;
  }

  35% {
    transform: scale(0.33);
  }

  40% {
    transform: scale(1.15);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dot-in {
  0% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.2);
  }

  75% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes fill-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  99% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes dot-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  40% {
    transform: scale(1);
  }

  99% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

#{$block} {
  display: flex;
  gap: var(--space-sm);
  box-sizing: border-box;
  border-radius: var(--radius-sm);

  &__input-wrapper {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    white-space: nowrap;
    border: 0;
    clip-path: inset(50%);
  }

  &__indicator {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    box-sizing: border-box;
    border-radius: var(--radius-lg);
    background: transparent;
    transform-box: fill-box;
    transform-origin: center;
    will-change: transform, opacity;
    fill: none;
  }

  &__base {
    fill: var(--radio-background-default);
    stroke: var(--radio-border-default);
    stroke-width: 2;
  }

  &__fill {
    animation: fill-out 0.16s cubic-bezier(0.33, 0, 0.67, 1) both;
  }

  &__dot {
    animation: dot-out 0.25s cubic-bezier(0.33, 0, 0.25, 1) both;
  }

  &__base,
  &__fill,
  &__dot {
    overflow: visible;
    transform-box: fill-box;
    transform-origin: center;
    fill: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    padding: 0;
  }

  &__label {
    @include mixins.text-md-normal;

    display: flex;
    gap: var(--space-xxs);
    align-items: flex-start;
    width: 100%;
  }

  &__icon {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    color: var(--icon-strong);
  }

  &__description {
    @include mixins.text-sm-normal;

    color: var(--text-subtle);
  }

  &:hover {
    cursor: pointer;

    #{$block}__base {
      fill: var(--radio-background-hover);
      stroke: var(--radio-border-hover);
    }
  }

  &--selected {
    #{$block}__base {
      fill: var(--radio-background-selected-default);
      stroke: var(--radio-border-selected-default);
    }

    #{$block}__fill {
      fill: var(--radio-background-selected-default);
      stroke: var(--radio-border-selected-default);
      stroke-width: 2;
      animation: fill-in 225ms cubic-bezier(0.33, 0, 0.67, 1) forwards;
    }

    #{$block}__dot {
      fill: var(--radio-thumb-background-active);
      opacity: 1;
      animation: dot-in 333ms cubic-bezier(0.26, 0.21, 0.67, 1) forwards;
    }

    &:hover {
      #{$block}__base {
        fill: var(--radio-background-selected-hover);
      }

      #{$block}__fill {
        fill: var(--radio-background-selected-hover);
        stroke: var(--radio-border-selected-hover);
      }
    }
  }
}
</style>
