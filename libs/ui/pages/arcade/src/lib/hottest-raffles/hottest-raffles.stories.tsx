import { Box, Container } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/wallpaper';
import {
  daysFromNow,
  hoursFromNow,
  minutesFromNow,
} from '@worksheets/util/time';

import { HottestRaffles } from './hottest-raffles';

type Story = Meta<typeof HottestRaffles>;

export default {
  component: HottestRaffles,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Container component={Box} maxWidth="xl" py={2}>
          <Story />
        </Container>
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    prizes: [
      {
        id: '1',
        name: "Baldur's Gate 3",
        expires: daysFromNow(3).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/bg3.jpeg',
      },
      {
        id: '2',
        name: 'City Skylines II',
        expires: hoursFromNow(-1).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/csii-2.png',
      },
      {
        id: '6',
        name: 'Ragnarok Online II',
        expires: minutesFromNow(12).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/ro.jpeg',
      },
      {
        id: '3',
        name: 'Palworld',
        expires: minutesFromNow(32).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/pw.jpeg',
      },
      {
        id: '5',
        name: 'Roller Coaster Tycoon 3',
        expires: minutesFromNow(12341).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/rct3.webp',
      },
      {
        id: '4',
        name: 'EA Sports FC 24',
        expires: hoursFromNow(-1).getTime(),
        company: 'steam-games',
        imageUrl: '/prizes/steam-games/fc24.jpg',
      },
    ],
  },
};
