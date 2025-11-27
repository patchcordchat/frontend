import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PIcon from '../PIcon.vue'

export default {
  title: 'Components/Data Display/PIcon',
  component: PIcon,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PIcon>

export const Sizes: Story = {
  args: {},
  render: () => ({
    components: { PIcon },
    template: `
      <p-icon
        icon="logos.patchcord.symbol"
        size="xxs"
      />
      <p-icon
        icon="logos.patchcord.symbol"
        size="xs"
      />
      <p-icon
        icon="logos.patchcord.symbol"
        size="sm"
      />
      <p-icon
        icon="logos.patchcord.symbol"
        size="md"
      />
      <p-icon
        icon="logos.patchcord.symbol"
        size="lg"
      />
    `,
  }),
}
