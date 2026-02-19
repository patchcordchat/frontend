<template>
  <svg-defs />

  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script setup lang="ts">
import { SvgDefs } from './ui'
</script>

<style lang="scss">
@use './styles/index' as *;
</style>
