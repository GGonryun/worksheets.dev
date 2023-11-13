import type { Meta } from '@storybook/react';
import { TeamCard } from './team-card';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';

const Story: Meta<typeof TeamCard> = {
  component: TeamCard,
  title: 'Cards/TeamCard',
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
    id: 'storybook',
    name: 'Storybook',
    subdomain: 'storybook',
    description: "My team's description",
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    growth: 1,
    games: 1,
    members: 2,
  },
};

export const WithoutGrowth = {
  args: {
    id: 'storybook',
    name: 'Storybook',
    subdomain: 'storybook',
    description: "My team's description",
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    games: 1,
    members: 2,
  },
};

export const WithoutDescription = {
  args: {
    id: 'storybook',
    name: 'Storybook',
    subdomain: 'storybook',
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    growth: 32,
    games: 1,
    members: 2,
  },
};
