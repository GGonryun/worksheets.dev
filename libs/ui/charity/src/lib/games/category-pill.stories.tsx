import type { Meta } from '@storybook/react';
import { CategoryPill } from './category-pill';

const Story: Meta<typeof CategoryPill> = {
  component: CategoryPill,
  title: 'Games/Pills/CategoryPill',
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'orange', padding: 10, width: 288 }}>
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    name: 'Popular Games',
    imageUrl: '/common/charity-games/art/trophy.svg',
    href: '#',
  },
};
