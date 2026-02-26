<template>
    <router-view v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
    </router-view>
</template>

<script setup lang="ts">

</script>