import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PRadioGroup from '../PRadioGroup.vue'

export default {
  title: 'Components/Inputs/PRadioGroup',
  component: PRadioGroup,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PRadioGroup>

export const Default: Story = {
  render: (args) => ({
    components: { PRadioGroup },
    setup() {
      const model = ref(false)
      const options = [
        {
          label: 'Option 1',
          value: 'option1',
          description: 'Description for option 1',
          icon: 'misc.hashtag',
        },
        {
          label: 'Option 2',
          value: 'option2',
          description: 'Description for option 2',
          icon: 'misc.speaker',
        },
        {
          label: 'Option 3',
          value: 'option3',
          description: 'Description for option 3',
          icon: 'misc.chat-bubbles',
        },
      ]
      return { args, options, model }
    },
    template: `
      <p-radio-group v-model="model" label="Выберите тариф" :options="options" />`,
  }),
}
