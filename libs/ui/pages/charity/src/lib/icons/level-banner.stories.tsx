import type { Meta } from '@storybook/react';

import { LevelBanner } from './level-banner';

const Story: Meta<typeof LevelBanner> = {
  component: LevelBanner,
  title: 'Icons/LevelBanner',
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
