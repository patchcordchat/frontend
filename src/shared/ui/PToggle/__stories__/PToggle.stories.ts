import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PToggle from '../PToggle.vue'
import PIcon from '../../PIcon/PIcon.vue'

export default {
  title: 'Components/Inputs/PToggle',
  component: PToggle,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PToggle>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PToggle, PIcon },
    template: `
      <p-toggle>
        <p-icon icon="logos.patchcord.symbol" />
      </p-toggle>  
    `,
  }),
}
