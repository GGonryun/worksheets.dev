import type { Meta } from '@storybook/react';
import { BasicGameInfo, DeveloperSchema } from '@worksheets/util/types';

import { DeveloperScreen } from './developer-screen';

const dummySocials: DeveloperSchema['socials'] = {
  facebook: 'https://www.facebook.com/CharityGamesOfficial',
  twitter: 'https://twitter.com/CharityGamesO',
  instagram: 'https://www.instagram.com/charitygamesofficial/',
  youtube: 'https://www.youtube.com/channel/UC1Jx7XJ1yYQ7WjQx0eQq6Og',
  twitch: 'https://www.twitch.tv/charitygamesofficial',
  discord: 'https://discord.gg/charitygames',
  website: 'https://charitygames.io',
  itchio: 'https://charitygames.itch.io/',
  tiktok: 'https://www.tiktok.com/@charitygamesofficial',
  steam: 'https://store.steampowered.com/charity/charitygames',
  playstore: 'https://play.google.com/store/apps/dev?id=7196278445280289529',
  pintrest: 'https://www.pinterest.com/charitygamesofficial/',
  linkedin: 'https://www.linkedin.com/company/charity-games',
  github: 'https://github.com/charity-games',
  appstore:
    'https://apps.apple.com/us/developer/charity-games-llc/id1537154374',
};

const sampleGameDefinitions: BasicGameInfo[] = Array.from({ length: 10 }).map(
  (_, i) => ({
    id: `game-${i}`,
    name: `Game ${i}`,
    image: `https://placekitten.com/200/300?image=${i}`,
  })
);

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
