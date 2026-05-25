import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { action } from 'storybook/actions'

import PButton from '../PButton.vue'

export default {
  title: 'Components/Inputs/PButton',
  component: PButton,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PButton>

export const Views: Story = {
  args: {
    onClick: action('onClick'),
  },
  render: () => ({
    components: { PButton },
    template: `
      <div style="display: flex; flex-wrap: wrap; max-width: 100%; gap: 0.5rem;">
        <p-button
          v-bind="args"
          view="danger"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="positive"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="secondary"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="filled-brand"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="filled-white"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-brand"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-danger"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-positive"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-primary"
        >
          Button
        </p-button>
      </div>
      `,
  }),
}

export const Loading: Story = {
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
  },
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { PButton },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; max-width: 100%; gap: 0.5rem;">
        <p-button
          v-bind="args"
          view="danger"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="positive"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="secondary"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="filled-brand"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="filled-white"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-brand"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-danger"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-positive"
        >
          Button
        </p-button>
        <p-button
          v-bind="args"
          view="outline-primary"
        >
          Button
        </p-button>
      </div>
      `,
  }),
}

export const Sizes: Story = {
  args: {
    onClick: action('onClick'),
  },
  render: () => ({
    components: { PButton },
    template: `
        <p-button
          v-bind="args"
          size="sm"
        >
          Button
        </p-button>
        <br/>
        <p-button
          v-bind="args"
          size="md"
        >
          Button
        </p-button>
      `,
  }),
}
