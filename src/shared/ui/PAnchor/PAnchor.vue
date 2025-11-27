<template>
  <a class="p-anchor" :href="props.href">
    <slot name="default"></slot>
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string
}

const props = withDefaults(defineProps<Props>(), {
  href: '#',
})
</script>

<style scoped lang="scss">
.p-anchor {
  color: var(--text-link);
  text-decoration: underline;
  cursor: pointer;
}
</style>
