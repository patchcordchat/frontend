<template>
    <div class="people-column">
        <template v-if="true">
            <div class="people-column__searchbar">
                <p-text-field placeholder="Поиск" icon="misc.magnifier" />
            </div>

            <people-list />
        </template>

        <template v-else>
            <div class="people-column__empty-state">
                <div class="people-column__empty-text">
                    Нет друзей. Нажмите «Добавить в друзья», чтобы отправить запросы дружбы.
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { PTextField } from '@/shared/ui';
import PeopleList from '@/widgets/people-list';
</script>

<style scoped lang="scss">
.people-column {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: hidden;

    &__searchbar {
        margin-block: var(--space-sm) var(--space-xs);
        margin-inline: var(--space-xl) var(--space-md);
    }

    &__empty-state {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
    }

    &__empty-text {
        flex: 0 1 auto;
        width: 100%;
        max-width: 440px;
        color: var(--text-muted);
        font-size: 1rem;
        line-height: 1.25rem;
        text-align: center;
    }
}
</style>