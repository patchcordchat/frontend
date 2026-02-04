<template>
  <router-view v-slot="{ Component }">
    <component v-if="Component" :is="Component" />

    <no-channel v-else />
  </router-view>
</template>

<script setup lang="ts">
import NoChannel from './NoChannel.vue'
</script>
