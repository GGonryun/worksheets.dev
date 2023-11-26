import type { Meta } from '@storybook/react';
import { CategoryScreen } from './category-screen';
import {
  sampleCategoryDescription,
  sampleCategoryItems,
  sampleGameItems,
} from '../../util';

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
