<template>
    <p-modal class="create-channel-modal" size="md" padding-size="sm" show-close-button ref="modalRef">
        <template #header>
            <div class="create-channel-modal__title">Создать канал</div>

            <div class="create-channel-modal__subtitle">в Текстовые каналы</div>
        </template>

        <template #body>
            <div class="p-modal__body-spacer" />

            <create-channel-form ref="formRef" />
        </template>

        <template #footer>
            <div class="create-channel-modal__footer">
                <p-button view="secondary" width="max" @click="modalRef?.close()">Отмена</p-button>

                <p-button width="max" type="submit" :form="formRef?.formId">Создать канал</p-button>
            </div>
        </template>
    </p-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PModal, PButton } from '@/shared/ui'
import CreateChannelForm from '@/features/create-channel'

const modalRef = ref<InstanceType<typeof PModal>>()
const formRef = ref<InstanceType<typeof CreateChannelForm>>()

defineExpose({
    open: () => modalRef.value?.open(),
    close: () => modalRef.value?.close(),
})
</script>

<style scoped lang="scss">
@use '@/app/styles/utils/mixins.scss' as mixins;

.create-channel-modal {
    &__title {
        @include mixins.heading-lg-semibold;

        margin-bottom: var(--space-xs);
        color: var(--text-strong);
        word-break: word-break;
        overflow-wrap: break-word;
    }

    &__subtitle {
        @include mixins.text-md-normal;

        color: var(--text-subtle);
    }

    &__footer {
        display: flex;
        flex-grow: 0;
        flex-shrink: 0;
        flex-wrap: wrap;
        gap: var(--space-xs);
        width: 100%;
        margin-left: auto;
    }
}
</style>