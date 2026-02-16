<template>
  <transition name="expand-fade-down">
    <component :is="currentStepComponent" :key="currentStep" @close="emit('close')" />
  </transition>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { useCreateServerForm, CREATE_SERVER_FORM_KEY } from '../model'

// Компоненты шагов
import TemplateStep from './TemplateStep.vue'
import AudienceStep from './AudienceStep.vue'
import CustomizeStep from './CustomizeStep.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const formApi = useCreateServerForm(() => {
  emit('close')
})

const { Step, currentStep } = formApi

const stepsMap = {
  [Step.TEMPLATE]: TemplateStep,
  [Step.AUDIENCE]: AudienceStep,
  [Step.CUSTOMIZE]: CustomizeStep,
}

const currentStepComponent = computed(() => stepsMap[currentStep.value])

provide(CREATE_SERVER_FORM_KEY, formApi)
</script>
