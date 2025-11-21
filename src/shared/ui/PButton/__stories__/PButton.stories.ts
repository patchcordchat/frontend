import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { action } from 'storybook/actions'

import PButton from '../PButton.vue'

export default {
  title: 'Components/Inputs/PButton',
  component: PButton,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PButton>

export const Default: Story = {
  args: {
    onClick: action('onClick'),
  },
}
