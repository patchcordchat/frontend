import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PTextField from '../PTextField.vue'

export default {
  title: 'Components/Inputs/PTextField',
  component: PTextField,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PTextField>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PTextField },
    template: `
        <p-text-field label="Label" placeholder="Placeholder" size="md" required/>
      `,
  }),
}
