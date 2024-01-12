import type { Meta } from '@storybook/react';
import {
  sampleCategoryDescription,
  sampleCategoryItems,
  sampleGameItems,
} from '@worksheets/ui/mocks';

import { CategoryScreen } from './category-screen';

const Story: Meta<typeof CategoryScreen> = {
  component: CategoryScreen,
  title: 'Content/CategoryScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    text: 'Idle Games',
    games: [...sampleGameItems],
    categories: [...sampleCategoryItems],
    description: sampleCategoryDescription,
  },
};
