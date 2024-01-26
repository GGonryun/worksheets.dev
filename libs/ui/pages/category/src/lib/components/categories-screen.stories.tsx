import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { sampleCategories } from '../data/sample-categories';
import { CategoriesScreen } from './categories-screen';

type Story = Meta<typeof CategoriesScreen>;
export default {
  component: CategoriesScreen,
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
    categories: sampleCategories,
  },
};
