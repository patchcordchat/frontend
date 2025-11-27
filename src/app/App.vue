<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const loader = document.getElementById('preloader')
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader)
  }
  window.app_ready = true
})
</script>

<style lang="scss">
@use './styles/index' as *;
</style>
