import type { Meta } from '@storybook/react';
import { GameScreen } from '.';

const Story: Meta<typeof GameScreen> = {
  component: GameScreen,
  title: 'Content/GameScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightgrey',
          padding: '10px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    suggestions: [
      ...Array.from({ length: 50 }).map((_, i) => ({
        type: 'game',
        id: i,
        name: 'Game ' + i,
        imageUrl: i % 3 === 1 ? 'https://via.placeholder.com/150' : undefined,
      })),
    ],
    categories: [
      {
        id: '1',
        name: 'Category Name 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        name: 'Category Name 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: '3',
        name: 'Category Name 3',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: '4',
        name: 'Category Name 4',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: '5',
        name: 'Category Name 5',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
};
