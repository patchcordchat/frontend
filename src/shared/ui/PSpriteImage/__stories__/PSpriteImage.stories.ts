import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PSpriteImage from '../PSpriteImage.vue'

export default {
  title: 'Components/Data Display/PSpriteImage',
  component: PSpriteImage,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PSpriteImage>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PSpriteImage },
    template: `
      <p-sprite-image type="emoji" name="anguished" />

      <p-sprite-image type="custom-emoji" name="anguished" />

      <p-sprite-image type="custom-emoji-grayscale" name="anguished" />`,
  }),
}
