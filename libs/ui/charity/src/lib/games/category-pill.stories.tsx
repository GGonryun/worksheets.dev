import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { CategoryPill } from './category-pill';

const meta: Meta<typeof CategoryPill> = {
  component: CategoryPill,
  title: 'Games/Pills/CategoryPill',
};
export default meta;
type Story = StoryObj<typeof CategoryPill>;
type StoryDecorator = Decorator<Story>;

const short: StoryDecorator = (Story) => (
  <div
    style={{
      backgroundColor: 'orange',
      padding: 10,
      width: 288,
      height: 72,
    }}
  >
    <Story />
  </div>
);

const tall: StoryDecorator = (Story) => (
  <div
    style={{
      backgroundColor: 'orange',
      padding: 10,
      width: 350,
      height: 180,
    }}
  >
    <Story />
  </div>
);

export const Primary = {
  args: {
    name: 'Popular Games',
    href: '#',
    imageUrl: '/common/charity-games/art/trophy.svg',
  },
  decorators: [short],
};

export const WithoutArrow = {
  args: {
    name: 'Popular Games',
    href: '#',
    imageUrl: '/common/charity-games/art/trophy.svg',
    hideArrow: true,
  },
  decorators: [short],
};

export const IsTall = {
  args: {
    name: 'Popular Games',
    href: '#',
    imageUrl: '/common/charity-games/art/trophy.svg',
  },
  decorators: [tall],
};
