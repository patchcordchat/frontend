<template>
  <router-link class="private-channel" :to="{ name: 'dm-chat', params: { dmId: props.id } }">
    <p-avatar class="private-channel__avatar" size="sm"
      src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
      status="online" />

    <div class="private-channel__content">
      dredhorse5
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { PAvatar } from '@/shared/ui'

interface Props {
  id: string
}

const props = defineProps<Props>()

</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.private-channel {
  @include mixins.text-md-medium;

  position: relative;
  display: flex;
  flex: 1 1 auto;
  gap: 8px;
  align-items: center;
  overflow: hidden;
  max-width: 23.438rem;
  height: 2.625rem;
  box-sizing: border-box;
  color: var(--text-muted);
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: var(--radius-sm);
  margin-inline-start: var(--space-xs);
  padding-block: 0;
  padding-inline: var(--space-xs) 0;

  &:hover {
    color: var(--interactive-text-hover);
    background-color: var(--interactive-background-hover);
  }

  &:active {
    color: var(--interactive-text-active);
    background: var(--interactive-background-active);
  }

  &.router-link-active {
    color: var(--text-default);
    background: var(--background-modifier-selected);
  }
}
</style>