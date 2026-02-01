import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PScrim from '../PScrim.vue'

export default {
  title: 'Components/Data Display/PScrim',
  component: PScrim,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PScrim>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PScrim },
    template: `
      <p-scrim />`,
  }),
}
