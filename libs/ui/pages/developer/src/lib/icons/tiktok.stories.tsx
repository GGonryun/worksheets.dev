import type { Meta } from '@storybook/react';

import { TikTok } from './tiktok';

const Story: Meta<typeof TikTok> = {
  component: TikTok,
  title: 'Icons/TikTok',
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
