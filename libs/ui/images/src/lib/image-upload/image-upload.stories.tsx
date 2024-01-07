import type { Meta } from '@storybook/react';
import { ImageUpload } from './image-upload';
import { action } from '@storybook/addon-actions';

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
    image: {
      id: 'thumbnail',
      status: 'uploaded',
      src: '/games/solitaire/icon.jpg',
      name: 'Solitaire Icon',
      height: 512,
      width: 512,
    },
  },
};

export const UploadingThumbnail: Story = {
  args: {
    height: 200,
    width: 200,
    image: {
      id: 'thumbnail',
      status: 'uploading',
      name: 'Solitaire Icon',
    },
  },
};

export const UploadedBanner: Story = {
  args: {
    height: 290,
    width: 430,
    image: {
      id: 'banner',
      status: 'uploaded',
      src: '/games/solitaire/banner.png',
      name: 'Solitaire Icon',
      width: 2208,
      height: 1242,
    },
  },
};

export const UploadingBanner: Story = {
  args: {
    height: 290,
    width: 430,
    image: {
      id: 'banner',
      status: 'uploading',
      name: 'Solitaire Icon',
    },
  },
};
