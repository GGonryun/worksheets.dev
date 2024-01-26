import type { Meta } from '@storybook/react';

import { CategoryBreadcrumbs } from './category-breadcrumbs';

const Story: Meta<typeof CategoryBreadcrumbs> = {
  component: CategoryBreadcrumbs,
};
export default Story;

export const Empty = {
  args: {
    categories: [],
  },
};

export const Primary = {
  args: {
    categories: ['puzzle', 'board', 'card'],
  },
};
