<template>
  <component :is="iconComponent" v-if="iconComponent" :class="classes" />
</template>

<script setup lang="ts">
import { shallowRef, watch, h, useAttrs, type Component } from 'vue'
import icons from '@/shared/assets/icons'

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

interface Props {
  size?: IconSize
  icon: string
  clickable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false,
  disabled: false,
})

const iconComponent = shallowRef<Component | null>(null)

const attrs = useAttrs()

const hasClick = !!(attrs.onClick || attrs.onClickOnce)

const classes = {
  'p-icon': true,
  [`p-icon--size-${props.size}`]: props.size,
  'p-icon--clickable': hasClick || props.clickable,
  'p-icon--disabled': props.disabled,
}

const extractViewBox = (svgString: string): string => {
  const viewBox = svgString.match(/viewBox=(["']?)([^"']+)\1/)?.[2]

  if (!viewBox) {
    throw new Error(`viewBox not found in icon: ${props.icon}`)
  }

  return viewBox
}

const stripSvgWrapper = (svgString: string): string => {
  return svgString
    .replace(/<svg[^>]*>/, (match) =>
      match
        .replace(/(width|height)=(["']?)\d+\2/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+>/g, '>'),
    )
    .replace(/^<svg[^>]*>|<\/svg>$/g, '')
    .trim()
}

const createSvgComponent = (svgString: string): Component => {
  const viewBox = extractViewBox(svgString)
  const svgContent = stripSvgWrapper(svgString)

  return {
    render() {
      return h('svg', {
        viewBox: viewBox,
        xmlns: 'http://www.w3.org/2000/svg',
        innerHTML: svgContent,
      })
    },
  }
}

const getIconPath = (iconName: string): string => {
  return `./${iconName.replace(/\./g, '/')}.svg`
}

const loadIcon = async () => {
  try {
    const path = getIconPath(props.icon)

    if (!icons || !icons[path]) {
      throw new Error(`Icon not found: ${path}`)
    }

    const iconModule = await icons[path]()

    if (typeof iconModule !== 'string') {
      throw new Error(`Invalid icon format for: ${path}`)
    }

    iconComponent.value = createSvgComponent(iconModule)
  } catch (error) {
    console.error('Error loading icon:', error)
    iconComponent.value = null
  }
}

watch(() => props.icon, loadIcon, { immediate: true })
</script>

<style scoped lang="scss">
.p-icon {
  --size: 100%;

  fill: currentcolor;
  width: var(--size);
  height: var(--size);

  &--clickable {
    cursor: pointer;
  }

  &--disabled {
    opacity: 0.38;
    pointer-events: none;
  }

  &--size {
    &-xxs {
      --size: var(--icon-size-xxs);
    }

    &-xs {
      --size: var(--icon-size-xs);
    }

    &-sm {
      --size: var(--icon-size-sm);
    }

    &-md {
      --size: var(--icon-size-md);
    }

    &-lg {
      --size: var(--icon-size-lg);
    }
  }
}
</style>
