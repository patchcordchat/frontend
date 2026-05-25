<template>
    <div class="action-button" v-tooltip="{ content: props.tooltip, placement: 'top' }">
        <p-icon :icon="props.icon" size="sm" />
    </div>
</template>

<script setup lang="ts">
import { PIcon } from '@/shared/ui';
import { vTooltip } from '@/shared/directives/v-tooltip';

const props = defineProps<{
    icon: string
    tooltip: string
}>()
</script>

<style scoped lang="scss">
.action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    color: var(--interactive-text-default);
    border-radius: 50%;
    background-color: var(--background-base-lower);
    cursor: pointer;

    &:hover {
        color: var(--interactive-text-hover);
    }
}
</style>