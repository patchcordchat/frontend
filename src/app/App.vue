<template>
  <svg-defs />

  <transition name="fade" mode="out-in">
    <splash-screen v-if="!isReady" />

    <router-view v-else />
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SplashScreen, SvgDefs } from './ui'

const isReady = ref(false)

//TODO сделать появление splash-screen завсящим на приложения и websocket соединения
onMounted(() => {
  setTimeout(() => {
    isReady.value = true
  }, 500)
})
</script>

<style lang="scss">
@use './styles/index' as *;
</style>
