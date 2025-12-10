import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PAvatar from '../PAvatar.vue'
import PIcon from '../../PIcon/PIcon.vue'
import PSvgDefs from '../../PSvgDefs/PSvgDefs.vue'

export default {
  title: 'Components/Data Display/PAvatar',
  component: PAvatar,
  parameters: {},
} as Meta

type Story = StoryObj<typeof PAvatar>

export const Default: Story = {
  args: {},
  render: () => ({
    components: { PAvatar, PSvgDefs, PIcon },
    template: `
    <div style="display: flex; gap: 0.5rem;">
      <p-svg-defs />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" status="dnd" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" status="idle" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" status="online" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" status="offline" />
    </div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <p-svg-defs />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="xxxs" status="online" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="xxs" status="online" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="xs" status="online" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="md" status="online" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="lg" status="offline" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="xl" status="offline" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="xxl" status="offline" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="xxxl" status="offline" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="4xl" status="offline" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="5xl" status="offline" />
      <p-avatar src="https://avatars.mds.yandex.net/i?id=ecfa145f911323995a8802601f8f3b07_l-4809781-images-thumbs&n=13" size="6xl" status="offline" />
    </div>
    `,
  }),
}
