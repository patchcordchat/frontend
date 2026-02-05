<template>
  <div class="message-feed">
    <ol>
      <li v-for="i in 10" :key="i">
        <message-card />
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MessageCard } from '@/entities/message'
</script>
