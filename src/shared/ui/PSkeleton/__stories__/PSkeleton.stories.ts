import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSkeleton from '../PSkeleton.vue'

export default {
  title: 'Components/Data Display/PSkeleton',
  component: PSkeleton,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSkeleton>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PSkeleton },
    template: `
      <p-skeleton />`,
  }),
}
