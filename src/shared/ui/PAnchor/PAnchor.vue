<template>
  <a class="p-anchor" :class="{ [`p-anchor--size-${size}`]: true }" :href="props.href">
    <slot name="default"></slot>
  </a>
</template>

<script setup lang="ts">
type AnchorSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
interface Props {
  size?: AnchorSize
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
  size: 'md',
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
