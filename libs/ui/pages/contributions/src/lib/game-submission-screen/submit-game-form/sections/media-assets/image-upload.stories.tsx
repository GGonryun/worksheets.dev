import type { Meta } from '@storybook/react';
import { ImageUpload } from './image-upload';

type Story = Meta<typeof ImageUpload>;
const DefaultStory: Story = {
  component: ImageUpload,
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
    status: 'uploaded',
    src: '/games/solitaire/icon.jpg',
    alt: 'Solitaire Icon',
  },
};

export const UploadingThumbnail: Story = {
  args: {
    height: 200,
    width: 200,
    status: 'uploading',
  },
};

export const UploadedBanner: Story = {
  args: {
    height: 290,
    width: 430,
    status: 'uploaded',
    src: '/games/solitaire/banner.png',
    alt: 'Solitaire Icon',
  },
};

export const UploadingBanner: Story = {
  args: {
    height: 290,
    width: 430,
    status: 'uploading',
  },
};
