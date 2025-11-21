import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PIcon from '../PIcon.vue'

export default {
  title: 'Components/Data Display/PIcon',
  component: PIcon,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PIcon>

export const Default: Story = {
  args: {},
}
