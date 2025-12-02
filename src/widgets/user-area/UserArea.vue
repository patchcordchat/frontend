<template>
  <section class="user-area">
    <div class="user-area__content">
      <div class="user-area__avatar-wrapper">
        <div></div>
        <div>
          <div>FIZIS</div>
          <div>В сети</div>
        </div>
      </div>
      <div class="user-area__buttons">
        <p-button view="danger" size="xs"><p-icon icon="misc.check" size="xs" /></p-button>
        <p-button view="secondary" size="xs"><p-icon icon="misc.check" size="xs" /></p-button>
        <p-button view="secondary" size="xs"><p-icon icon="misc.check" size="xs" /></p-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PButton, PIcon } from '@/shared/ui'
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
  border: 1px solid var(--border-faint);
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
    &:hover {
      color: var(--interactive-hover);
      background-color: var(--background-mod-normal);
    }
  }

  &__buttons {
    display: flex;
    gap: var(--space-xs);
  }
}
</style>
