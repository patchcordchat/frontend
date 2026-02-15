<template>
  <label class="p-radio">
    <span class="p-radio__input-wrapper">
      <input type="radio" />
    </span>

    <svg class="p-radio__indicator" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" class="p-radio__base"></circle>
      <circle cx="20" cy="20" r="20" class="p-radio__fill"></circle>
      <circle cx="20" cy="20" r="8" class="p-radio__dot"></circle>
    </svg>

    <div class="p-radio__content">
      <span v-if="slots.default" class="p-radio__label">
        <slot name="default" />
      </span>

      <div v-if="slots.description" class="p-radio__description">
        <slot name="description" />
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.p-radio';

@keyframes fill-in {
  from {
    background-color: transparent;
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    background-color: currentcolor;
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dot-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fill-out {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

@keyframes dot-out {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.5);
    filter: blur(2px);
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
    }
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
    fill: var(--radio-thumb-background-active);
    animation: dot-out 0.25s cubic-bezier(0.33, 0, 0.25, 1) both;
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

  &__description {
    @include mixins.text-sm-normal;

    color: var(--text-subtle);
  }
}
</style>
