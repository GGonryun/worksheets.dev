import type { Meta } from '@storybook/react';
import { GameSubmissionStatus } from '@prisma/client';
import { GameSubmission } from '.';
import Box from '@mui/material/Box';

type Story = Meta<typeof GameSubmission>;

const Default: Story = {
  component: GameSubmission,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Story />
        </Box>
      </div>
    ),
  ],
};
export default Default;

export const Pending: Story = {
  args: {
    id: '4',
    slug: null,
    title: 'Word Smith',
    status: GameSubmissionStatus.PENDING,
    thumbnail: '/games/word-smith/icon.jpg',
    tooltip: 'This game is currently pending approval.',
  },
};

export const EmptyDraft: Story = {
  args: {
    id: '3',
    status: GameSubmissionStatus.DRAFT,
    slug: null,
    title: null,
    thumbnail: null,
    tooltip: null,
  },
};

export const Rejected: Story = {
  args: {
    id: '2',
    title: 'Word Pack',
    slug: null,
    status: GameSubmissionStatus.REJECTED,
    thumbnail: '/games/word-search/icon.jpg',
    tooltip:
      "This game's standards are too low for approval, please contact us if you would like to proceed with the application process.",
  },
};

export const Accepted: Story = {
  args: {
    id: '1',
    title: 'Word Search',
    slug: 'word-search',
    status: GameSubmissionStatus.ACCEPTED,
    thumbnail: '/games/word-pack/banner.jpg',
    tooltip: null,
  },
};
