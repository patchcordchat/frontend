<template>
  <component
    :is="tag"
    class="p-anchor"
    :class="{ [`p-anchor--size-${size}`]: size }"
    v-bind="linkAttributes"
  >
    <slot name="default"></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type RouteLocationRaw } from 'vue-router'

type AnchorSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
interface Props {
  size?: AnchorSize
  href?: string
  target?: string
  to?: RouteLocationRaw
}

const props = defineProps<Props>()

const tag = computed(() => {
  return props.to ? 'router-link' : 'a'
})

const linkAttributes = computed(() => {
  if (props.to) {
    return { to: props.to }
  }
  return { href: props.href || '#', target: props.target || '_self' }
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.p-anchor {
  color: var(--text-link);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &--size {
    &-xxs {
      @include mixins.text-xxs-normal;
    }

    &-xs {
      @include mixins.text-xs-normal;
    }

    &-sm {
      @include mixins.text-sm-normal;
    }

    &-md {
      @include mixins.text-md-normal;
    }

    &-lg {
      @include mixins.text-lg-normal;
    }
  }
}
</style>
