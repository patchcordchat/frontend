<template>
    <div class="p-slider" ref="sliderRef" @mousedown="onDragStart" @touchstart="onDragStart">
        <div class="p-slider__track"></div>

        <div class="p-slider__bar">
            <div class="p-slider__bar-fill" :style="{ width: `${percentage}%` }"></div>
        </div>

        <div class="p-slider__track" :style="{ left: `${percentage}%` }">
            <div class="p-slider__grabber"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

const modelValue = defineModel<number>({ required: true });

const props = withDefaults(defineProps<{
    min?: number;
    max?: number;
    step?: number;
}>(), {
    min: 0,
    max: 100,
    step: 1
});

const sliderRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const percentage = computed(() => {
    const range = props.max - props.min;
    if (range === 0) return 0;

    const clampedValue = Math.max(props.min, Math.min(props.max, modelValue.value));
    return ((clampedValue - props.min) / range) * 100;
});

const updateValueFromClientX = (clientX: number) => {
    if (!sliderRef.value) return;

    const rect = sliderRef.value.getBoundingClientRect();

    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));

    let newValue = props.min + percent * (props.max - props.min);

    if (props.step > 0) {
        newValue = Math.round((newValue - props.min) / props.step) * props.step + props.min;
    }

    newValue = Math.max(props.min, Math.min(props.max, newValue));

    if (newValue !== modelValue.value) {
        modelValue.value = newValue;
    }
};

const onDragStart = (e: MouseEvent | TouchEvent) => {
    if (e.cancelable) e.preventDefault();

    isDragging.value = true;

    const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    updateValueFromClientX(clientX);

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('touchend', onDragEnd);
};

const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value) return;
    const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    updateValueFromClientX(clientX);
};

const onDragEnd = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', onDragEnd);
};

onUnmounted(() => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', onDragEnd);
});
</script>

<style scoped lang="scss">
.p-slider {
    --grabber-size: 1rem;
    --bar-size: 0.25rem;
    --bar-offset: 0px;
    --custom-track-inset: 0.313rem;

    position: relative;
    width: 100%;
    height: 1.5rem;

    &__track {
        position: absolute;
        top: 0;
        bottom: 0;
        box-sizing: border-box;
        inset-inline: var(--custom-track-inset);
    }

    &__bar {
        position: relative;
        top: calc((1.5rem - var(--bar-size)) / 2 + var(--bar-offset));
        display: block;
        overflow: hidden;
        height: var(--bar-size);
        box-sizing: border-box;
        border-radius: var(--radius-xs);
        background-color: var(--slider-track-background);
    }

    &__bar-fill {
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #ffffff1a;
        background-color: var(--background-brand);
    }

    &__grabber {
        position: absolute;
        top: 50%;
        width: var(--grabber-size);
        height: var(--grabber-size);
        margin-top: calc(var(--grabber-size) / -2);
        box-sizing: border-box;
        border: 1px solid var(--border-normal);
        border-radius: 50%;
        background-color: var(--white);
        box-shadow: var(--shadow-low);
        cursor: ew-resize;
        margin-inline-start: calc(var(--grabber-size) / -2);
    }
}
</style>