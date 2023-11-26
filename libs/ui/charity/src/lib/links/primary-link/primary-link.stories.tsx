import type { Meta } from '@storybook/react';
import { PrimaryLink } from './primary-link';

const Story: Meta<typeof PrimaryLink> = {
  component: PrimaryLink,
  title: 'Links/PrimaryLink',
};
export default Story;

export const Primary = {
  args: {
    children: 'This is a primary link',
  },
};
