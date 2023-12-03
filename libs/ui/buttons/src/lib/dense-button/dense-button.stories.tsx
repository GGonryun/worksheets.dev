import type { Meta } from '@storybook/react';
import { DenseButton } from './dense-button';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Story: Meta<typeof DenseButton> = {
  component: DenseButton,
  title: 'Buttons/DenseButton',
};
export default Story;

export const Primary = {
  args: {
    children: 'Dense Button',
  },
};

export const Black = {
  args: {
    children: 'Black Button',
    color: 'black',
  },
};

export const Favorite = {
  args: {
    children: 'Favorite',
    color: 'love',
    startIcon: <FavoriteIcon />,
  },
};
