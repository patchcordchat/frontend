import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PCheckbox from '../PCheckbox.vue'

export default {
  title: 'Components/Inputs/PCheckbox',
  component: PCheckbox,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PCheckbox>

export const Default: Story = {
  args: {},
}
