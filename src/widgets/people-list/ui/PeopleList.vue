<template>
    <div class="people-list">
        <div class="people-list__content">
            <div class="people-list__title-wrapper">
                <h2 class="people-list__title">В сети — 6</h2>
            </div>

            <people-list-item v-for="i in 6" :key="i" />
        </div>
    </div>
</template>

<script setup lang="ts">
import PeopleListItem from './PeopleListItem.vue'
</script>

<style lang="scss" scoped>
@use '@/app/styles/utils/mixins.scss' as mixins;

.people-list {
    flex: 1 1 auto;
    flex-grow: 0;
    overflow: hidden scroll;
    padding-right: 0;
    padding-bottom: var(--space-xs);

    &__title-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        @include mixins.text-sm-medium;

        flex: 1 1 auto;
        color: var(--text-default);
        white-space: nowrap;
        margin-block: var(--space-md);
        margin-inline: 1.875rem 1.25rem;
        margin-inline-start: var(--space-xl);
    }
}
</style>