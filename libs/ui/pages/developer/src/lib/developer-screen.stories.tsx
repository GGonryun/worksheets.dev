import type { Meta } from '@storybook/react';
import { DeveloperScreen } from './developer-screen';
import { dummySocials, sampleGameDefinitions } from '@worksheets/ui/mocks';

const Story: Meta<typeof DeveloperScreen> = {
  component: DeveloperScreen,
  title: 'Content/DeveloperScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
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
    name: 'Charity Games',
    socials: dummySocials,
    games: sampleGameDefinitions,
  },
};

export const NoSocials = {
  args: {
    name: 'Charity Games',
    socials: {},
    games: sampleGameDefinitions,
  },
};

export const noGames = {
  args: {
    name: 'Charity Games',
    socials: dummySocials,
    games: [],
  },
};
