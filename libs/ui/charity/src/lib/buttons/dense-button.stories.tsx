import type { Meta } from '@storybook/react';
import { DenseButton } from './dense-button';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Story: Meta<typeof DenseButton> = {
  component: DenseButton,
  title: 'Buttons/DenseButton',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
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
