<template>
  <div class="p-server-icon" :class="`p-server-icon--size-${props.size}`">
    <img v-if="iconSrc" class="p-server-icon__img" :src="iconSrc" :alt="props.alt">

    <div v-else class="p-server-icon__acronym">
      {{ acronym }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { StoragePaths } from '@/shared/utils'

type IconSize = 'xs' | 'md'

interface Props {
  serverId?: string
  iconHash?: string
  name: string
  size?: IconSize,
  quality?: number
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const iconSrc = computed(() => getIconSrc(props.serverId, props.iconHash))
const acronym = computed(() => getAcronym(props.name))

const getIconSrc = (serverId: string | undefined, iconHash: string | undefined): string | undefined => {
  if (!iconHash || !serverId) {
    return undefined
  }

  return StoragePaths.serverIcon(serverId, iconHash)
}

const getAcronym = (serverName: string) => {
  if (!serverName) return '?'
  return serverName
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .substring(0, 5);
}
</script>

<style scoped lang="scss">
.p-server-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &--size {
    &-xs {
      width: var(--size-lg);
      height: var(--size-lg);
      border-radius: var(--radius-xs);
    }

    &-md {
      width: var(--size-xxl);
      height: var(--size-xxl);
      border-radius: var(--radius-md);
    }
  }

  &__img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: var(--opacity-8);
  }
}
</style>
