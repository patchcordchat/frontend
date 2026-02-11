<template>
  <component
    :is="tagType"
    class="nav-item"
    :class="{ 'nav-item--active': isActive }"
    :to="to"
    @click="onClick"
    v-tooltip="{ content: label, placement: 'right', appendTo: 'parent' }"
  >
    <div v-if="type === 'link'" class="nav-item__marker">
      <span></span>
    </div>

    <div class="nav-item__content">
      <img v-if="src" class="nav-item__image" :src="src" :alt="label" />

      <p-icon v-else-if="icon" :icon="icon" size="md" class="nav-item__icon-component" />

      <span v-else class="nav-item__initials">
        {{ initials }}
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PIcon } from '@/shared/ui'
import { vTooltip } from '@/shared/directives/v-tooltip'

interface Props {
  type?: 'button' | 'link'
  to?: string | object
  src?: string
  icon?: string
  label?: string
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  label: '',
  isActive: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const tagType = computed(() => {
  if (props.type === 'link' && props.to) {
    return 'RouterLink'
  }
  return 'button'
})

const initials = computed(() => {
  if (!props.label) return '?'
  return props.label
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

const onClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped lang="scss">
.nav-item {
  position: relative;
  display: flex;
  justify-content: center;
  width: 4.5rem;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &__marker {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: var(--size-xs);
    height: 100%;
    contain: layout size;
    inset-inline-start: 0;

    span {
      position: absolute;
      display: block;
      width: 0.5rem;
      height: 2.5rem;
      border-radius: 0 0.25rem 0.25rem 0;
      background-color: var(--header-primary);
      opacity: 0;
      transform: translateX(-0.25rem);
      transition:
        opacity 0.2s ease,
        transform 0.2s ease;
      margin-inline-start: -0.25rem;
    }
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-md);
    background-color: var(--background-modifier-hover);
    transition:
      color 0.15s ease-out,
      background-color 0.15s ease-out;
  }

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__initials {
    font-size: 0.9rem;
    font-weight: 500;
  }

  &:hover &__marker span {
    opacity: 1;
    transform: translateX(0) scaleY(0.2);
  }

  &.router-link-active &__marker span,
  &:active &__marker span {
    opacity: 1;
    transform: translateX(0) scaleY(1);
  }

  &:active &__content {
    transform: translateY(1px);
  }

  &.router-link-active &__content,
  &:hover &__content {
    color: var(--text-primary);
    background-color: var(--brand-500);
  }
}
</style>
