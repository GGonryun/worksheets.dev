import type { Meta } from '@storybook/react';

import { TwitchTv } from './twitch-tv';

const Story: Meta<typeof TwitchTv> = {
  component: TwitchTv,
  title: 'Icons/TwitchTv',
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
