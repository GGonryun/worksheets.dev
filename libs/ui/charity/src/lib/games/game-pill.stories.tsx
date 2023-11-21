import type { Meta } from '@storybook/react';
import { GamePill } from './game-pill';

const Story: Meta<typeof GamePill> = {
  component: GamePill,
  title: 'Games/Pills/GamePill',
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'orange', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    name: 'Solitaire',
    developer: 'Charity.Games',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    href: '#',
  },
};

export const Overflow = {
  args: {
    name: 'Solitaire is a Really Long Game Name',
    developer: 'Charity.Games is a Really Long Developer Name',
    imageUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    href: '#',
  },
};
