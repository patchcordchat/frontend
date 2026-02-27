<template>
    <div class="p-sprite-image" :style="spriteStyle">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SPRITE_CONFIGS, type SpriteType } from './sprites.config';

interface Props {
    type: SpriteType;
    name: string;
}

const props = defineProps<Props>();

const spriteStyle = computed(() => {
    const config = SPRITE_CONFIGS[props.type];
    const coords = config?.items[props.name];

    if (!config || !coords) {
        console.warn(`Sprite or item not found: ${props.type} -> ${props.name}`);
        return {};
    }

    return {
        backgroundImage: `url("${config.url}")`,
        backgroundPosition: `${coords[0]}px ${coords[1]}px`,
        backgroundSize: `${config.sheetSize.width}px ${config.sheetSize.height}px`,
        width: `${config.itemSize.width}px`,
        height: `${config.itemSize.height}px`,
        display: 'inline-block',
        verticalAlign: 'middle',
        transformOrigin: 'top left'
    };
});
</script>

<style scoped>
.p-sprite-image {
    flex-shrink: 0;
    background-repeat: no-repeat;
}
</style>