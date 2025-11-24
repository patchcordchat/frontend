import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PLabel from '../PLabel.vue'

export default {
  title: 'Components/Data Display/PLabel',
  component: PLabel,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PLabel>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PLabel },
    template: `
      <p-label text="Label" required />`,
  }),
}
