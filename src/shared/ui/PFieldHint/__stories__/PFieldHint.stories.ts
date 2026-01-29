import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PFieldHint from '../PFieldHint.vue'

export default {
  title: 'Components/Data Display/PFieldHint',
  component: PFieldHint,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PFieldHint>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PFieldHint },
    template: `
      <p-field-hint> Field hint </p-field-hint>`,
  }),
}
