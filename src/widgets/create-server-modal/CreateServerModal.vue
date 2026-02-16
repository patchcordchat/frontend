<template>
    <p-modal size="md" padding-size="sm" show-close-button ref="modalRef">
        <create-server-form @close="modalRef?.close()" />
    </p-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PModal } from '@/shared/ui'

const modalRef = ref<InstanceType<typeof PModal>>()
</script>