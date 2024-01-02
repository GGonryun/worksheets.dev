import type { Meta } from '@storybook/react';
import { GameFile } from './game-file';
import { addMinutesToCurrentTime } from '@worksheets/util/time';

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

export const Ready: Story = {
  args: {
    file: {
      name: 'game.zip',
      size: 123456,
      lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
      status: 'ready',
    },
    error: '',
  },
};

export const Uploading: Story = {
  args: {
    file: {
      name: 'game.zip',
      size: 123456,
      lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
      status: 'uploading',
    },
    error: '',
  },
};

export const Uploaded: Story = {
  args: {
    file: {
      name: 'game.zip',
      size: 123456,
      lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
      status: 'uploaded',
    },
    error: '',
  },
};

export const Error: Story = {
  args: {
    file: {
      name: 'game.zip',
      size: 123456,
      lastModified: addMinutesToCurrentTime(-61 * 3).getTime(),
      status: 'error',
    },
    error: 'Failed to upload file. Please try again.',
  },
};
