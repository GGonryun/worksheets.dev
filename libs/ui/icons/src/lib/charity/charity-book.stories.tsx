import type { Meta } from '@storybook/react';
import { CharityBook } from './charity-book';

const Story: Meta<typeof CharityBook> = {
  component: CharityBook,
  title: 'Icons/Charity/Book',
};
export default Story;

export const Primary = {
  args: {
    fontSize: 'large',
  },
};

export const Large = {
  args: {
    sx: {
      height: 200,
      width: 200,
    },
  },
};
