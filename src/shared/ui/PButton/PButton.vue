<template>
  <component
    :is="tag"
    :href="isLink ? href : undefined"
    :type="!isLink ? type : undefined"
    :target="isLink ? target : undefined"
    :disabled="!isLink ? disabled : undefined"
    :class="classes"
    @click="handleClick"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isLink?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  target?: '_blank' | '_self' | '_parent' | '_top'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLink: false,
  href: '#',
  type: 'button',
  target: '_self',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = {
  'p-button': true,
}

const tag = computed<string>(() => (props.isLink ? 'a' : 'button'))

const handleClick = (event: MouseEvent) => {
  if (props.disabled && !props.isLink) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style scoped lang="scss"></style>
