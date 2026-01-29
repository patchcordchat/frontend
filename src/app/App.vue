<template>
  <p-svg-defs />

  <router-view />
</template>

<script setup lang="ts">
import { PSvgDefs } from '@/shared/ui'
</script>

<style lang="scss">
@use './styles/index' as *;
</style>
