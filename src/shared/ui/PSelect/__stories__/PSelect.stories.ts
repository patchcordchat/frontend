import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSelect from '../PSelect.vue'

export default {
  title: 'Components/Inputs/PSelect',
  component: PSelect,
  render: (args) => ({
    components: { PSelect },
    setup() {
      return { args }
    },
    template: `<p-select v-bind="args" />`,
  }),
} as Meta

type Story = StoryObj<typeof PSelect>

export const Default: Story = {
  args: {
    items: [
      { value: '1', title: 'Option 1' },
      { value: '2', title: 'Option 2' },
      { value: '3', title: 'Option 3' },
    ],
  },
}
