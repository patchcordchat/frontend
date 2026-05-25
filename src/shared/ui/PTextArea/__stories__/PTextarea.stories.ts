import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PTextarea from '../PTextarea.vue'

export default {
  title: 'Components/Inputs/PTextarea',
  component: PTextarea,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PTextarea>

export const Default: Story = {
  render: (args) => ({
    components: { PTextarea },
    setup() {
      const model = ref<string>('')
      return { args, model }
    },
    template: `
      <p-text-area v-model="model" placeholder="Написать #test" />
    `,
  }),
}
