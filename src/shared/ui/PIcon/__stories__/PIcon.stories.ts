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
  render: () => ({
    components: { PIcon },
    template: `
      <p-icon
        icon="logos.github"
        size="xxs"
      />
      <p-icon
        icon="logos.github"
        size="xs"
      />
      <p-icon
        icon="logos.github"
        size="sm"
      />
      <p-icon
        icon="logos.github"
        size="md"
      />
      <p-icon
        icon="logos.github"
        size="lg"
      />
      <p-icon
        icon="logos.github"
        size="xl"
      />
      <p-icon
        icon="logos.github"
        size="xxl"
      />
    `,
  }),
}
