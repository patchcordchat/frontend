<template>
  <svg-defs />

  <transition name="fade" mode="out-in">
    <splash-screen v-if="!isConnected" />

    <router-view v-else />
  </transition>
</template>

<script setup lang="ts">
import { SplashScreen, SvgDefs } from './ui'
import { useSocketWorker } from '@/shared/api/socket';

const { isConnected } = useSocketWorker();
</script>

<style lang="scss">
@use './styles/index' as *;
</style>
