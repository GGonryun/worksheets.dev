import type { Meta } from '@storybook/react';

import { sampleCategories } from '../../../data';
import { CategorySection } from './category-section';

type Story = Meta<typeof CategorySection>;
export default {
  component: CategorySection,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          height: 'auto',
          padding: '20px 0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    categories: sampleCategories,
  },
};
