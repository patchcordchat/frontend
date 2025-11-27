import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PAnchor from '../PAnchor.vue'

export default {
  title: 'Components/Inputs/PAnchor',
  component: PAnchor,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PAnchor>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PAnchor },
    template: `
      <p-anchor>Anchor</p-anchor>`,
  }),
}
