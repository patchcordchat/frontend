<template>
  <section class="user-area">
    <div class="user-area__content">
      <div class="user-area__avatar-wrapper">
        <p-avatar size="sm" :src="userAvatar()" status="online" />

        <div class="user-area__name-block">
          <div class="user-area__global-name">{{ currentUser?.global_name }}</div>

          <div class="user-area__hover-roll">
            <div class="user-area__status">В сети</div>

            <div class="user-area__username">{{ currentUser?.username }}</div>
          </div>
        </div>
      </div>

      <div class="user-area__buttons">
        <mic-control />

        <speaker-control />

        <p-button size="sm" :has-text="false" v-tooltip="{
          content: 'Настройки пользователя',
          placement: 'top',
        }">
          <p-icon icon="misc.gear" size="sm" />
        </p-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { PAvatar, PIcon, PButton } from '@/shared/ui'
import { useCurrentUserStore } from '@/entities/user'
import { StoragePaths } from '@/shared/utils'
import DefaultAvatar from '@/shared/assets/images/user/default-avatar.png'
import { MicControl, SpeakerControl, useAudioStore } from '@/features/audio-control'
import { vTooltip } from '@/shared/directives/v-tooltip'

const audioStore = useAudioStore()
const currentUserStore = useCurrentUserStore()
const { currentUser } = storeToRefs(currentUserStore)

const userAvatar = () => {
  if (currentUser.value?.avatar) {
    return StoragePaths.userAvatar(currentUser.value.id, currentUser.value.avatar)
  }

  return DefaultAvatar
}

onMounted(() => {
  audioStore.init()
})

onBeforeMount(async () => {
  if (!currentUser.value) {
    await currentUserStore.fetchCurrentUser()
  }
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

$block: '.user-area';

#{$block} {
  position: absolute;
  bottom: var(--space-xs);
  z-index: 10;
  flex: 0 0 auto;
  justify-content: space-between;
  width: calc(100% - var(--space-xs) * 2);
  box-sizing: border-box;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-sm);
  background: var(--background-base-low);
  inset-inline-start: var(--space-xs);

  &__content {
    @include mixins.text-sm-medium;

    position: relative;
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    gap: var(--space-xs);
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    min-height: 2.75rem;
    padding: var(--space-sm);
    box-sizing: border-box;
    border-radius: 0.438rem;
    background: unset;
    container-type: inline-size;
    -webkit-margin-start: -1px;
    margin-inline-start: -1px;
  }

  &__avatar-wrapper {
    display: flex;
    flex: 1;
    gap: var(--space-xs);
    align-items: center;
    min-width: 7rem;
    margin: 0;
    padding: var(--space-xxs);
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      color: var(--interactive-text-hover);
      background-color: var(--background-modifier-hover);
    }
  }

  &__name-block {
    display: flex;
    flex-direction: column;
  }

  &__global-name {
    @include mixins.text-md-medium;
  }

  &__hover-roll {
    position: relative;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: top;
    text-align: start;
    cursor: revert;
    contain: paint;
  }

  &__status,
  &__username {
    @include mixins.text-xs-normal;

    color: var(--text-secondary);
    transition: all .22s ease;
  }

  &__status {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &__username {
    position: absolute;
    opacity: 0;
    transform: translate3d(0, 107%, 0);
    inset: 0;
  }

  &:hover {
    #{$block}__status {
      opacity: 0;
      transform: translate3d(0, -107%, 0);
    }

    #{$block}__username {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  &__buttons {
    display: flex;
    gap: var(--space-xs);
  }
}
</style>
