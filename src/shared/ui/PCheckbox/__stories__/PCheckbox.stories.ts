import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PCheckbox from '../PCheckbox.vue'

export default {
  title: 'Components/Inputs/PCheckbox',
  component: PCheckbox,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PCheckbox>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PCheckbox },
    template:
      '<p-checkbox label="(Необязательно) Я не против получать электронные письма с новостями Discord, советами и специальными предложениями. От рассылки можно отписаться в любое время." />',
  }),
}
