<template>
    <div class="add-friend-tab">
        <header class="add-friend-tab__header">
            <h2 class="add-friend-tab__title">Добавить в друзья</h2>

            <add-friend-form />
        </header>

        <header class="add-friend-tab__header">
            <h2 class="add-friend-tab__title">Где ещё можно завести друзей</h2>

            <div>
                Нет знакомых пользователей? Тогда просмотрите наш список открытых серверов, где найдётся всё, от игр до
                кулинарии, музыки, аниме и многого другого.
            </div>
        </header>

        <div></div>
    </div>
</template>

<script setup lang="ts">
import AddFriendForm from '@/features/add-friend';
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.add-friend-tab {
    &__header {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        gap: var(--space-xs);
        padding: var(--space-lg) 1.875rem;
        border-bottom: 1px solid var(--border-subtle);
    }

    &__title {
        @include mixins.heading-lg-semibold;

        margin-bottom: var(--space-xs);
        color: var(--text-strong);
    }
}
</style>