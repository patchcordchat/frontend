<template>
  <section class="user-area">
    <div class="user-area__content">
      <div class="user-area__avatar-wrapper">
        <p-avatar
          size="sm"
          src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13"
          status="online"
        />

        <div class="user-area__name-block">
          <div class="user-area__name">FIZIS</div>
          <div class="user-area__status">В сети</div>
        </div>
      </div>

      <div class="user-area__buttons">
        <p-toggle><p-icon icon="misc.mic" /></p-toggle>

        <p-toggle><p-icon icon="misc.headset" /></p-toggle>

        <p-toggle><p-icon icon="misc.gear" /></p-toggle>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PToggle, PIcon, PAvatar } from '@/shared/ui'
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.user-area {
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

  &__name {
    @include mixins.text-md-medium;
  }

  &__status {
    @include mixins.text-xs-normal;

    color: var(--text-secondary);
  }

  &__buttons {
    display: flex;
    gap: var(--space-xs);
  }
}
</style>
