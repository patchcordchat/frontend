<template>
    <nav class="dm-sidebar">
        <div class="dm-sidebar__search-bar">
            <p-button width="max" view="secondary">Найти или начать беседу</p-button>
        </div>

        <div class="dm-sidebar__body">
            <p-button width="max" view="secondary">Друзья</p-button>
            <p-button width="max" view="secondary">Volt</p-button>
            <p-button width="max" view="secondary">Магазин</p-button>
            <p-button width="max" view="secondary">Задания</p-button>

            <div class="dm-sidebar__separator"></div>

            <ul class="dm-sidebar__channel-list">
                <li class="dm-sidebar__channel-list-item">
                    Канал 1
                </li>

                <li class="dm-sidebar__channel-list-item">
                    Канал 2
                </li>

                <li class="dm-sidebar__channel-list-item">
                    Канал 3
                </li>

                <li class="dm-sidebar__channel-list-item">
                    Канал 4
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { PButton } from '@/shared/ui';
</script>