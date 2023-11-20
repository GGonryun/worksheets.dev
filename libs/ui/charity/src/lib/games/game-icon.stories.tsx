import type { Meta } from '@storybook/react';
import { GameIcon } from './game-icon';

const Story: Meta<typeof GameIcon> = {
  component: GameIcon,
  title: 'Games/GameIcon',
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ccc', padding: '10px', width: '120px' }}>
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    name: 'Solitaire',
    iconUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
  },
};

export const Hot = {
  args: {
    name: 'Solitaire',
    iconUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    banner: 'hot',
  },
};

export const New = {
  args: {
    name: 'Solitaire',
    iconUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    banner: 'new',
  },
};

export const Played = {
  args: {
    name: 'Solitaire',
    iconUrl: 'https://storage.googleapis.com/game-logos/solitaire.jpg',
    banner: 'played',
  },
};

export const WithoutIcon = {
  args: {
    name: 'Super Duper Game',
  },
};
