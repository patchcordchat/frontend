import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PPopover from '../PPopover.vue'

export default {
  title: 'Components/Data Display/PPopover',
  component: PPopover,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PPopover>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PPopover },
    template: `
      <p-popover>
        test
      </p-popover>`,
  }),
}
