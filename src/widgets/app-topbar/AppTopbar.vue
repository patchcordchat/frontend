<template>
  <div class="app-topbar">
    <div class="app-topbar__title-wrapper">
      <div class="app-topbar__title">
        <p-icon icon="logos.patchcord.symbol" size="xs" />

        <div>{{ route.meta.title }}</div>
      </div>
    </div>

    <div class="app-topbar__actions">
      <div class="app-topbar__control">
        <p-icon icon="misc.drawer" size="md" clickable />
      </div>

      <div class="app-topbar__control">
        <p-icon icon="misc.question-circle" size="md" clickable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { PIcon } from '@/shared/ui'
const route = useRoute()
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.app-topbar {
  position: relative;
  display: flex;
  gap: var(--space-xs);
  place-content: end;
  align-items: center;
  min-height: 2rem;
  -webkit-padding-end: var(--space-sm);
  padding-inline-end: var(--space-sm);
  -webkit-app-region: drag;

  &__title-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    inset-inline: 0;
  }

  &__title {
    @include mixins.text-sm-medium;

    display: inline-flex;
    gap: var(--space-xs);
    align-items: center;
    justify-content: center;
    max-width: 50vw;
  }

  &__actions {
    position: relative;
    z-index: 1;
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    justify-content: flex-end;
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--icon-tertiary);

    &:hover {
      color: var(--icon-primary);
    }
  }
}
</style>
