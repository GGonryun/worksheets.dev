import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { ImagePill } from './image-pill';

type Story = StoryObj<typeof ImagePill>;
type StoryDecorator = Decorator<Story>;

const basic: StoryDecorator = (Story) => (
  <div style={{ backgroundColor: 'orange', padding: 10, height: 80 }}>
    <Story />
  </div>
);

const smallWidth: StoryDecorator = (Story) => (
  <div
    style={{
      width: 400,
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof ImagePill> = {
  component: ImagePill,
  title: 'Pills/ImagePill',
};

export default meta;

export const Primary = {
  args: {
    src: '/partners/sidecade/logo_500.png',
    alt: 'sidecade logo',
    subtitle: 'Add charity games to your website',
  },
  decorators: [basic],
};

export const Small = {
  args: {
    href: '#',
    src: '/partners/sidecade/logo_500.png',
    alt: 'sidecade logo',
    subtitle: 'Play games anywhere on the web',
  },
  decorators: [basic, smallWidth],
};
