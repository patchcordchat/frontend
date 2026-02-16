import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PRadio from '../PRadio.vue'

export default {
  title: 'Components/Inputs/PRadio',
  component: PRadio,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PRadio>

export const Default: Story = {
  render: (args) => ({
    components: { PRadio },
    setup() {
      const model = ref(false)
      const value = 'option1'
      return { args, value, model }
    },
    template: `
      <p-radio v-model="model" :value="value">Radio</p-radio>`,
  }),
}
