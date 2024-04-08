import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { GameSubmissionStatus } from '@worksheets/prisma';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { BasicGameSubmission } from '@worksheets/util/types';

import { SubmissionsPanel } from './submissions-panel';

type Story = Meta<typeof SubmissionsPanel>;

const Default: Story = {
  component: SubmissionsPanel,
  args: {
    onApproveTermsOfService: async () => {
      action('onApproveTermsOfService');
    },
    submissions: [],
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Paper sx={{ p: 3 }}>
          <Story />
        </Paper>
      </StoryWallpaper>
    ),
  ],
};
export default Default;

const submissions: BasicGameSubmission[] = [
  {
    id: '1',
    title: 'Word Search',
    slug: 'word-search',
    status: GameSubmissionStatus.ACCEPTED,
    thumbnail: '/games/word-pack/banner.jpg',
    tooltip: null,
  },
  {
    id: '2',
    title: 'Word Pack',
    slug: null,
    status: GameSubmissionStatus.REJECTED,
    thumbnail: '/games/word-search/icon.jpg',
    tooltip:
      "This game's standards are too low for approval, please contact us if you would like to proceed with the application process.",
  },
  {
    id: '3',
    status: GameSubmissionStatus.DRAFT,
    slug: null,
    title: null,
    thumbnail: null,
    tooltip: null,
  },
  {
    id: '4',
    slug: null,
    title: 'Word Smith',
    status: GameSubmissionStatus.PENDING,
    thumbnail: '/games/word-smith/icon.jpg',
    tooltip: 'This game is currently pending approval.',
  },
];

export const Empty: Story = {
  args: {
    terms: {
      hasApproved: true,
      canApprove: false, // doesn't matter if already approved
    },
    submissions: [],
  },
};

export const HasSubmissions: Story = {
  args: {
    terms: {
      hasApproved: true,
      canApprove: false, // doesn't matter if already approved
    },
    submissions: submissions,
  },
};

export const CannotSubmit: Story = {
  args: {
    terms: {
      hasApproved: false,
      canApprove: false,
    },
  },
};

export const RequireApproval: Story = {
  args: {
    terms: {
      hasApproved: false,
      canApprove: true,
    },
  },
};
