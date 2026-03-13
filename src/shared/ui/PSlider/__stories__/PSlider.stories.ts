import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSlider from '../PSlider.vue'
import { ref } from 'vue'

export default {
  title: 'Components/Inputs/PSlider',
  component: PSlider,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSlider>

export const Default: Story = {
  render: (args) => ({
    components: { PSlider },
    setup() {
      const value = ref(0)
      return { args, value }
    },
    template: `
      <p-slider v-model="value"/>
    `,
  }),
}
