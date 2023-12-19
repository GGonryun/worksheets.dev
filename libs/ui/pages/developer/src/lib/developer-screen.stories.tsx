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
    avatarUrl: 'https://cdn.charity.games/_developers/charity-games.png',
    description:
      'A collection of games for charity. A collection of games for charity. A collection of games for charity. A collection of games for charity.',
    socials: dummySocials,
    games: sampleGameDefinitions,
  },
};

export const NoSocials = {
  args: {
    name: 'Charity Games',
    avatarUrl: 'https://cdn.charity.games/_developers/wmgcat.png',
    description:
      'A collection of games for charity. A collection of games for charity. A collection of games for charity. A collection of games for charity.',
    socials: {},
    games: sampleGameDefinitions,
  },
};

export const noGames = {
  args: {
    name: 'Charity Games',
    avatarUrl: 'https://cdn.charity.games/_developers/gamemonetize.png',
    description:
      'A collection of games for charity. A collection of games for charity. A collection of games for charity. A collection of games for charity.',
    socials: dummySocials,
    games: [],
  },
};
