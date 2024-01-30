import { BugReport, Laptop, Share, Smartphone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { Description } from './description.component';

type Story = Meta<typeof Description>;

export default {
  component: Description,
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Primary: Story = {
  args: {
    title: 'About This Prize',
    description: `**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.`,
  },
};

export const Game: Story = {
  args: {
    title: (
      <Box display="flex" gap={{ xs: 2, sm: 4 }} alignItems="baseline">
        About This Game
        <Box display="flex" gap={{ xs: 1, sm: 2 }}>
          <Share />
          <BugReport />
        </Box>
      </Box>
    ),
    ancillary: (
      <Box color="text.arcade" display="flex" gap={1}>
        <Laptop />
        <Smartphone />
      </Box>
    ),
    description: `**RollerCoaster Tycoon 3** is a 2004 construction and management simulation video game. It is the third installment in the RollerCoaster Tycoon series, and was developed by Frontier Developments. RollerCoaster Tycoon 3 places players in charge of managing amusement parks; rides can be built or demolished, terrain and scenery can be adjusted, and prices can be controlled to keep visitors or "peeps" happy.\n\nRollerCoaster Tycoon 3 features two methods of gameplay. In career mode, players must complete predetermined objectives in predesigned scenarios. In the newly added sandbox mode, players have unlimited time and money to create their own custom parks and rides. Features introduced in the series include the ability to import and export custom attractions, design custom scenarios and peeps, as well as design an in-game roller coaster and a fully three-dimensional world players can view from all angles.\n\nIn 2014, a sequel, RollerCoaster Tycoon 4 Mobile was released on mobile devices, to largely negative reception.`,
  },
};
