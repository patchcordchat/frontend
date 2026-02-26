import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PServerIcon from '../PServerIcon.vue'

export default {
  title: 'Components/Data Display/PInput',
  component: PServerIcon,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PServerIcon>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PServerIcon },
    template: `
      <p-server-icon />`,
  }),
}
