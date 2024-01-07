import type { Meta } from '@storybook/react';
import Paper from '@mui/material/Paper';
import { SubmissionsPanel } from './submissions-panel';
import { action } from '@storybook/addon-actions';
import { GameSubmissionStatus } from '@prisma/client';
import { GameSubmissionProps } from './game-submission';

type Story = Meta<typeof SubmissionsPanel>;

const Default: Story = {
  component: SubmissionsPanel,
  args: {
    onApproveTermsOfService: action('onApproveTermsOfService'),
    submissions: [],
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '2rem',
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

const submissions: GameSubmissionProps[] = [
  {
    id: '1',
    title: 'Word Search',
    slug: 'word-search',
    status: GameSubmissionStatus.ACCEPTED,
    thumbnail: '/games/word-pack/banner.jpg',
  },
  {
    id: '2',
    title: 'Word Pack',
    status: GameSubmissionStatus.REJECTED,
    thumbnail: '/games/word-search/icon.jpg',
    tooltip:
      "This game's standards are too low for approval, please contact us if you would like to proceed with the application process.",
  },
  {
    id: '3',
    status: GameSubmissionStatus.DRAFT,
  },
  {
    id: '4',
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
