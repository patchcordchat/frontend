<template>
    <div class="p-sprite-image" :style="spriteStyle">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SpriteConfig, type SpriteType } from '@/shared/config';

interface Props {
    type: SpriteType;
    name: string;
}

const props = defineProps<Props>();

const spriteStyle = computed(() => {
    const config = SpriteConfig[props.type];
    const coords = config?.items[props.name];

    if (!config || !coords) {
        console.warn(`Sprite or item not found: ${props.type} -> ${props.name}`);
        return {};
    }

    return {
        backgroundImage: `url("${config.url}")`,
        backgroundPosition: `${coords[0]}px ${coords[1]}px`,
        backgroundSize: `${config.sheetSize.width}px ${config.sheetSize.height}px`,
        ['--sprite-size']: `${config.spriteSize}px`,
    };
});
</script>

<style scoped>
.p-sprite-image {
    flex-shrink: 0;
    width: var(--sprite-size);
    height: var(--sprite-size);
    background-repeat: no-repeat;
}
</style>