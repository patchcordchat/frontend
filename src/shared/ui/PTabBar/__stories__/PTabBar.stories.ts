import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PTabBar from '../PTabBar.vue'

export default {
  title: 'Components/Inputs/PTabBar',
  component: PTabBar,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PTabBar>

export const Default: Story = {
  render: (args) => ({
    components: { PTabBar },
    setup() {
      const model = ref(false)
      return { args, model }
    },
    template: `
      <p-tab-bar v-model="model" />`,
  }),
}
