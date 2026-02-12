import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PCloseButton from '../PCloseButton.vue'

export default {
  title: 'Components/Inputs/PCloseButton',
  component: PCloseButton,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PCloseButton>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PCloseButton },
    template: `
      <p-close-button />`,
  }),
}
