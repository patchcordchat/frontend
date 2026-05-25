<template>
  <label
    class="p-switch"
    :class="{
      'p-switch--active': model,
      'p-switch--disabled': disabled,
    }"
  >
    <div class="p-switch__indicator">
      <svg class="p-switch__thumb" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="8"></rect>
      </svg>
    </div>

    <span class="p-switch__input-wrapper">
      <input
        type="checkbox"
        v-model="model"
        :disabled="props.disabled"
        :name="props.name"
        :value="value"
        @click.stop
      />
    </span>
  </label>
</template>

<script setup lang="ts" generic="T">
interface Props {
  disabled?: boolean
  name?: string
  value?: T
}

const props = defineProps<Props>()

const model = defineModel<boolean>({ default: false })
</script>

<style scoped lang="scss">
$block: '.p-switch';

@keyframes slide-on {
  0% {
    transform: translateX(1px) scale(1);
  }

  40% {
    transform: translateX(50%) scale(1.3, 0.8);
  }

  99% {
    transform: translateX(100%) scale(1.05, 0.95);
  }

  100% {
    transform: translateX(100%) scale(1);
  }
}

@keyframes slide-off {
  0% {
    transform: translateX(100%) scale(1);
  }

  40% {
    transform: translateX(50%) scale(1.3, 0.8);
  }

  99% {
    transform: translateX(1px) scale(1.05, 0.95);
  }

  100% {
    transform: translateX(1px) scale(1);
  }
}

#{$block} {
  cursor: pointer;

  &--active {
    #{$block}__indicator {
      border-color: var(--switch-border-selected-default);
      background-color: var(--switch-background-selected-default);
    }

    #{$block}__thumb {
      transform: translateX(100%);
      animation: slide-on 0.25s cubic-bezier(0.33, 0, 0.25, 1) forwards;
    }

    &:hover {
      #{$block}__indicator {
        border-color: var(--switch-border-selected-hover);
        background-color: var(--switch-background-selected-hover);
      }
    }
  }

  &:hover {
    #{$block}__indicator {
      border-color: #97979f66;
    }
  }

  &__indicator {
    position: relative;
    width: 3rem;
    height: 1.5rem;
    box-sizing: border-box;
    border: 1px solid var(--switch-border-default);
    border-radius: var(--radius-lg);
    background-color: var(--switch-background-default);
    opacity: 1;
    transition: background-color 0.25s cubic-bezier(0.33, 0, 0.25, 1);
  }

  &__thumb {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: -1px;
    margin-left: -1px;
    fill: white;
    transform: translateX(1px);
    animation: slide-off 0.25s cubic-bezier(0.33, 0, 0.25, 1) forwards;
    will-change: transform;
  }

  &__input-wrapper {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    white-space: nowrap;
    clip-path: inset(50%);
    user-select: none;
  }
}
</style>
