import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PModal from '../PModal.vue'

export default {
  title: 'Components/Data Display/PModal',
  component: PModal,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PModal>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PModal },
    template: `
      <p-modal>
        <template #header>
          <h1> Header </h1>
          <div> custom-text </div>
        </template>
        
        <template #body>
          <div> custom-body-text </div>
          <div> custom-body-text </div>
        </template>

        <template #footer>
          <div> custom-footer-text </div>
          <div> custom-footer-text </div>
        </template>
      </p-modal>`,
  }),
}
