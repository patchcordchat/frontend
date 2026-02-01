<template>
  <p-modal>
    <transition name="expand-fade-down">
      <component :is="currentStepComponent" :key="currentStep" />
    </transition>
  </p-modal>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { PModal } from '@/shared/ui'
import { useCreateServerForm, CREATE_SERVER_FORM_KEY } from '../model'

// Компоненты шагов
import TemplateStep from './TemplateStep.vue'
import AudienceStep from './AudienceStep.vue'
import CustomizeStep from './CustomizeStep.vue'

const formApi = useCreateServerForm()

const { Step, currentStep } = formApi

const stepsMap = {
  [Step.TEMPLATE]: TemplateStep,
  [Step.AUDIENCE]: AudienceStep,
  [Step.CUSTOMIZE]: CustomizeStep,
}

const currentStepComponent = computed(() => stepsMap[currentStep.value])

provide(CREATE_SERVER_FORM_KEY, formApi)
</script>
