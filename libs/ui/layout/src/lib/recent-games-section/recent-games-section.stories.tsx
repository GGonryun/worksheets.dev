import type { Meta } from '@storybook/react';
import { RecentGamesSection } from '../recent-games-section';
import { sampleRecommendations } from '@worksheets/ui/mocks';

const Story: Meta<typeof RecentGamesSection> = {
  component: RecentGamesSection,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '90%',
          height: 'auto',
          padding: '20px 0',
          backgroundColor: 'rgb(250, 203, 202)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Empty = {
  args: {
    recent: [],
  },
};

export const WithGames = {
  args: {
    recent: sampleRecommendations.popular,
  },
};
