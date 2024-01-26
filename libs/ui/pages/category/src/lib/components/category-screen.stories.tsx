import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { sampleCategories } from '../data/sample-categories';
import { sampleCategoryDescription } from '../data/sample-category-description';
import { sampleGames } from '../data/sample-games';
import { CategoryScreen } from './category-screen';

type Story = Meta<typeof CategoryScreen>;

export default {
  component: CategoryScreen,
  title: 'Content/CategoryScreen',
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
    name: 'Idle Games',
    games: sampleGames,
    relatedCategories: sampleCategories,
    description: sampleCategoryDescription,
  },
};
