import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSvgDefs from '../PSvgDefs.vue'

export default {
  title: 'Components/Data Display/PSvgDefs',
  component: PSvgDefs,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSvgDefs>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PSvgDefs },
    template: `
    <div>
      <p-svg-defs />
    </div>
    `,
  }),
}
