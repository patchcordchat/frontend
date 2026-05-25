import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PInput from '../PInput.vue'

export default {
  title: 'Components/Inputs/PInput',
  component: PInput,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PInput>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PInput },
    template: `
      <p-input />`,
  }),
}
