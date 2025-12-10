<template>
  <svg
    class="p-avatar"
    :class="`p-avatar--size-${props.size}`"
    overflow="visible"
    :viewBox="`0 0 56 56`"
  >
    <foreignObject width="100%" height="100%" x="0" y="0" :mask="`url(#svg-mask-${avatarMask})`">
      <img v-if="props.src" :alt="props.alt" :src="props.src" class="p-avatar__img" />
    </foreignObject>

    <rect
      v-if="props.status"
      class="p-avatar__status"
      :class="`p-avatar__status--${props.status}`"
      :mask="`url(#svg-mask-status-${props.status})`"
    ></rect>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Status = 'online' | 'idle' | 'offline' | 'dnd'

type Size =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | '4xl'
  | '5xl'
  | '6xl'

interface Props {
  src: string
  alt: string
  status?: Status
  size: Size
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const avatarMask = computed(() => {
  return props.status ? 'avatar-status-round' : 'avatar-default'
})
</script>

<style scoped lang="scss">
.p-avatar {
  position: relative;
  width: var(--size);
  height: var(--size);

  &--size {
    &-xxxs {
      --size: var(--avatar-size-xxxs);
    }

    &-xxs {
      --size: var(--avatar-size-xxs);
    }

    &-xs {
      --size: var(--avatar-size-xs);
    }

    &-md {
      --size: var(--avatar-size-md);
    }

    &-lg {
      --size: var(--avatar-size-lg);
    }

    &-xl {
      --size: var(--avatar-size-xl);
    }

    &-xxl {
      --size: var(--avatar-size-xxl);
    }

    &-xxxl {
      --size: var(--avatar-size-xxxl);
    }

    &-4xl {
      --size: var(--avatar-size-4xl);
    }

    &-5xl {
      --size: var(--avatar-size-5xl);
    }

    &-6xl {
      --size: var(--avatar-size-6xl);
    }
  }

  &__status {
    position: absolute;
    x: 66%;
    y: 65%;
    width: 34%;
    height: 34%;

    &--online {
      fill: var(--icon-status-online);
    }

    &--idle {
      fill: var(--icon-status-idle);
    }

    &--offline {
      fill: var(--icon-status-offline);
    }

    &--dnd {
      fill: var(--icon-status-dnd);
    }
  }
}
</style>
