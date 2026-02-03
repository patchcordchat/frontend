<template>
  <ul class="channel-list">
    <section-divider />

    <list-item name="test text" icon="misc.speaker" :type="0" />

    <list-group />

    <list-item name="test voice" icon="misc.speaker" :type="1" />

    <list-item name="test video" icon="misc.speaker" :type="1" />
  </ul>
</template>

<script setup lang="ts">
import ListItem from './ListItem.vue'
import ListGroup from './ListGroup.vue'
import SectionDivider from './SectionDivider.vue'
</script>
