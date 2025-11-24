import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSelect from '../PSelect.vue'

export default {
  title: 'Components/Inputs/PSelect',
  component: PSelect,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSelect>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PSelect },
    template: `
      <p-select />`,
  }),
}
