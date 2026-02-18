import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PTextArea from '../PTextArea.vue'

export default {
  title: 'Components/Inputs/PTextArea',
  component: PTextArea,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PTextArea>

export const Default: Story = {
  render: (args) => ({
    components: { PTextArea },
    setup() {
      const model = ref<string>('')
      return { args, model }
    },
    template: `
      <p-text-area v-model="model" placeholder="Написать #test" />
    `,
  }),
}
