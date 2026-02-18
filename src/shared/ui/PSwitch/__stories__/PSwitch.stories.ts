import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSwitch from '../PSwitch.vue'

export default {
  title: 'Components/Inputs/PSwitch',
  component: PSwitch,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSwitch>

export const Default: Story = {
  render: (args) => ({
    components: { PSwitch },
    setup() {
      const model = ref(false)
      return { args, model }
    },
    template: `
      <p-switch v-model="model" />`,
  }),
}
