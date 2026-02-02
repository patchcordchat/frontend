import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PUploadIcon from '../PUploadIcon.vue'

export default {
  title: 'Components/Inputs/PUploadIcon',
  component: PUploadIcon,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PUploadIcon>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PUploadIcon },
    template: `
      <p-upload-icon />`,
  }),
}
