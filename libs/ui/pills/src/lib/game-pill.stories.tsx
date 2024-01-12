import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { GamePill } from './game-pill';

type Story = StoryObj<typeof GamePill>;
type StoryDecorator = Decorator<Story>;

const basic: StoryDecorator = (Story) => (
  <div style={{ backgroundColor: 'orange', padding: 10, height: 72 }}>
    <Story />
  </div>
);

const smallWidth: StoryDecorator = (Story) => (
  <div
    style={{
      width: 288,
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof GamePill> = {
  component: GamePill,
  title: 'Pills/GamePill',
};

export default meta;

export const Primary = {
  args: {
    name: 'Solitaire',
    developer: 'Charity.Games',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    href: '#',
  },
  decorators: [basic],
};

export const Overflow = {
  args: {
    name: 'Solitaire is a Really Long Game Name',
    developer: 'Charity.Games is a Really Long Developer Name',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    href: '#',
  },
  decorators: [basic, smallWidth],
};
