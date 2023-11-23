import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { GameIcon } from './game-icon';

const meta: Meta<typeof GameIcon> = {
  component: GameIcon,
  title: 'Games/GameIcon',
};

export default meta;
type Story = StoryObj<typeof GameIcon>;
type StoryDecorator = Decorator<Story>;

const smallDecorator: StoryDecorator = (Story) => (
  <div style={{ backgroundColor: '#ccc', padding: '10px', width: '120px' }}>
    <Story />
  </div>
);

const largeDecorator: StoryDecorator = (Story) => (
  <div style={{ backgroundColor: '#ccc', padding: '10px', width: '240px' }}>
    <Story />
  </div>
);

export const Primary = {
  args: {
    name: 'Solitaire',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
  },
  decorators: [smallDecorator],
};

export const Hot = {
  args: {
    name: 'Solitaire',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    banner: 'hot',
  },
  decorators: [smallDecorator],
};

export const New = {
  args: {
    name: 'Solitaire',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    banner: 'new',
  },
  decorators: [smallDecorator],
};

export const Played = {
  args: {
    name: 'Solitaire',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    banner: 'played',
  },
  decorators: [smallDecorator],
};

export const WithoutIcon = {
  args: {
    name: 'Super Duper Game',
  },
  decorators: [smallDecorator],
};

export const Large: Story = {
  args: {
    name: 'Solitaire',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
  },
  decorators: [largeDecorator],
};
