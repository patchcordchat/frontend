<template>
  <div class="auth-layout">
    <img class="auth-layout__background" :src="authBackground" alt="" />
    <p-icon class="auth-layout__logo" icon="logos.github" size="lg" />
    <div class="auth-layout__content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui'
import authBackground from '@/shared/assets/images/auth/background.svg'
</script>

<style scoped lang="scss">
.auth-layout {
  position: relative;
  overflow: auto;
  width: 100vw;
  min-height: 100vh;

  &__background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    inset-inline-start: 0;
  }

  &__logo {
    inset-inline-start: 3rem;
    position: relative;
    top: 3rem;
  }

  &__content-wrapper {
    width: 100%;
    height: 100%;

    @media (width >= 486px) and (height >= 580px) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 36.25rem;
      inset-inline-start: 0;
    }

    @media (width >= 486px) and (height >= 0) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      inset-inline-start: 0;
    }
  }
}
</style>
