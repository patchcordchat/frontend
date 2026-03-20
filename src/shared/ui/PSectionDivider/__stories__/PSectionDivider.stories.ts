import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSectionDivider from '../PSectionDivider.vue'

export default {
  title: 'Components/Data Display/PSectionDivider',
  component: PSectionDivider,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSectionDivider>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PSectionDivider },
    template: `
      <p-section-divider />`,
  }),
}
