import { Paper } from '@mui/material';
import type { Meta } from '@storybook/react';
import { MAX_TOKENS_PER_DAY } from '@worksheets/util/settings';

import { PlayGamesSection } from './play-games-section';

type Story = Meta<typeof PlayGamesSection>;

const Default: Story = {
  component: PlayGamesSection,
  args: {},
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '1rem',
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Story />
        </Paper>
      </div>
    ),
  ],
};
export default Default;

export const NoProgress: Story = {
  args: {
    tokens: 0,
  },
};

export const PartialProgress: Story = {
  args: {
    tokens: 123,
  },
};

export const CompleteProgress: Story = {
  args: {
    tokens: MAX_TOKENS_PER_DAY,
  },
};
