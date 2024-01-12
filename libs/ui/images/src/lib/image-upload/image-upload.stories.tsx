import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ImageUpload } from './image-upload';

type Story = Meta<typeof ImageUpload>;
const DefaultStory: Story = {
  component: ImageUpload,
  args: {
    onDelete: action('onDelete'),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '16px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'white',
            height: '100%',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};
export default DefaultStory;

export const UploadedThumbnail: Story = {
  args: {
    height: 200,
    width: 200,
    src: '/games/solitaire/icon.jpg',
  },
};

export const UploadingThumbnail: Story = {
  args: {
    height: 200,
    width: 200,
  },
};

export const ErrorThumbnail: Story = {
  args: {
    height: 200,
    width: 200,
    error: 'Image must be at least 250x250 pixels.',
  },
};

export const UploadedBanner: Story = {
  args: {
    height: 290,
    width: 430,
    src: '/games/solitaire/banner.png',
  },
};

export const UploadingBanner: Story = {
  args: {
    height: 290,
    width: 430,
  },
};
