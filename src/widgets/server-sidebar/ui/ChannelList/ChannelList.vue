<template>
  <ul class="channel-list">
    <list-group />

    <list-item name="pron" icon="misc.speaker" :type="0" />

    <list-item name="pron1" icon="misc.speaker" :type="0" />
  </ul>
</template>

<script setup lang="ts">
import ListItem from './ListItem.vue'
import ListGroup from './ListGroup.vue'
</script>

<style scoped lang="scss">
.channel-list {
}
</style>
