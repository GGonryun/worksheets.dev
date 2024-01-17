import { Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { TokensPanels } from '@worksheets/util/enums';

import { GiftBoxSection } from './gift-box-section';

type Story = Meta<typeof GiftBoxSection>;

const Default: Story = {
  component: GiftBoxSection,
  args: {
    id: TokensPanels.GiftBoxes,
    active: TokensPanels.GiftBoxes,
    onClick: action('onClick'),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '1rem',
        }}
      >
        <Paper sx={{ p: 1 }}>
          <Story />
        </Paper>
      </div>
    ),
  ],
};
export default Default;

export const Empty: Story = {
  args: {
    amount: 0,
  },
};

export const Available: Story = {
  args: {
    amount: 12,
  },
};
