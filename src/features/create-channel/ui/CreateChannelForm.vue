<template>
  <form :id="formId" class="create-channel-form" @submit.prevent="handleSubmit">
    <p-radio-group v-model="type" v-bind="typeAttrs" label="Тип канала" :options="options" />

    <p-text-field v-model="name" v-bind="nameAttrs" label="Название канала" size="md" />
  </form>
</template>

<script setup lang="ts">
import { useId, watch } from 'vue'
import { PTextField, PRadioGroup, type RadioOption } from '@/shared/ui'
import { useCreateChannelForm } from '../model'

interface Props {
  serverId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const options: RadioOption<number>[] = [
  {
    label: 'Текст',
    value: 0,
    description: 'Отправляйте сообщения, изображения, GIF, эмодзи, мнения и приколы',
    icon: 'misc.hashtag',
  },
  {
    label: 'Голос',
    value: 1,
    description: 'Общайтесь голосом или в видеочате и пользуйтесь функцией показа экрана',
    icon: 'misc.speaker',
  },
  {
    label: 'Форум',
    value: 15,
    description: 'Создайте площадку для обсуждений',
    icon: 'misc.chat-bubbles',
    disabled: true,
  },
]

const formApi = useCreateChannelForm()
const { name, nameAttrs, type, typeAttrs, onSubmit } = formApi

const formId = `form-${useId()}`

const handleSubmit = async (payload: SubmitEvent) => {
  await onSubmit(payload)
  emit('submit')
}

watch(
  () => props.serverId,
  (newServerId) => {
    formApi.serverId.value = newServerId
  },
  { immediate: true },
)


defineExpose({
  formId,
})
</script>

<style lang="scss">
.create-channel-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
</style>
