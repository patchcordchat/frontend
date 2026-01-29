import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PStatusMessage from '../PStatusMessage.vue'

export default {
  title: 'Components/Data Display/PStatusMessage',
  component: PStatusMessage,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PStatusMessage>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PStatusMessage },
    template: `
      <p-status-message />`,
  }),
}
