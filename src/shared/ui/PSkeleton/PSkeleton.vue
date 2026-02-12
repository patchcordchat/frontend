<template>
  <div :class="['p-skeleton', className]" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  width?: string
  height?: string
  borderRadius?: string
  className?: string
  opacity?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  borderRadius: '0.5rem',
  className: '',
  opacity: '0.15',
})

const styles = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius,
  opacity: props.opacity,
}))
</script>

<style scoped lang="scss">
.p-skeleton {
  display: block;
  flex: 0 0 auto;
  height: 1rem;
  margin-top: 0.1875rem;
  line-height: 1.375rem;
  background-color: var(--text-default);
}
</style>
