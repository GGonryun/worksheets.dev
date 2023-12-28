import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { NoUserAuthModal } from './no-user-auth';
import { Favorite, ThumbsUpDown } from '@mui/icons-material';

const Story: Meta<typeof NoUserAuthModal> = {
  component: NoUserAuthModal,
  args: {
    open: true,
    onClose: action('onClose'),
    href: '#',
  },
};
export default Story;

export const VoteWarning = {
  args: {
    icon: <ThumbsUpDown fontSize="large" color="success" />,
    text: 'Submit your vote on games.',
  },
};

export const FavoriteWarning = {
  args: {
    icon: <Favorite fontSize="large" color="error" />,
    text: 'Save your favorite games.',
  },
};
