import type { Meta } from '@storybook/react';
import { CategoryCarousel } from './category-carousel';

const Story: Meta<typeof CategoryCarousel> = {
  component: CategoryCarousel,
  title: 'Layout/Drawer/CategoryCarousel',
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: 'auto',
          padding: '20px 0',
          backgroundColor: 'rgb(250, 203, 202)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};
