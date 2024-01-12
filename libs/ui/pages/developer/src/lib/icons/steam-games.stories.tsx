import type { Meta } from '@storybook/react';

import { SteamGames } from './steam-games';

const Story: Meta<typeof SteamGames> = {
  component: SteamGames,
  title: 'Icons/SteamGames',
};
export default Story;

export const Primary = {
  args: {
    fontSize: 'large',
  },
};

export const Large = {
  args: {
    sx: {
      height: 200,
      width: 200,
    },
  },
};
