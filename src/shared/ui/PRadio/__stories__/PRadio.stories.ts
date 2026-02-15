import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PRadio from '../PRadio.vue'

export default {
  title: 'Components/Inputs/PRadio',
  component: PRadio,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PRadio>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PRadio },
    template: `
      <p-radio>Radio</p-radio>`,
  }),
}
