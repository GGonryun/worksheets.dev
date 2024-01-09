import type { Meta } from '@storybook/react';
import { GameFile } from './game-file';

type Story = Meta<typeof GameFile>;
const DefaultStory: Story = {
  component: GameFile,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          width: '420px',
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

export const Uploading: Story = {
  args: {
    url: 'https://example.com/game.zip',
    size: 123456789,
    status: 'uploading',
    error: '',
  },
};

export const Uploaded: Story = {
  args: {
    url: 'https://example.com/game.zip',
    size: 0,
    status: 'uploaded',
    error: '',
  },
};

export const Error: Story = {
  args: {
    url: 'https://example.com/game.zip',
    size: 0,
    status: 'error',
    error: 'Failed to upload file. Please try again.',
  },
};
