import type { Meta, StoryObj } from '@storybook/react';
import { CategoryGrid } from './category-grid';

const meta: Meta<typeof CategoryGrid> = {
  component: CategoryGrid,
  title: 'Games/CategoryGrid',
};
export default meta;

type Story = StoryObj<typeof CategoryGrid>;

export const Primary: Story = {
  args: {
    categories: Array.from({ length: 100 }).map((_, i) => ({
      id: `${i}`,
      name: 'Category ' + i,
    })),
  },
};
