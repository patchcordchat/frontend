import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PTooltip from '../PTooltip.vue'

export default {
  title: 'Components/Data Display/PTooltip',
  component: PTooltip,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PTooltip>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PTooltip },
    template: `
      <p-tooltip />
    `,
  }),
}
