import { Flex } from '@worksheets/ui-core';
import { FeatureLayout, urls } from '@worksheets/ui/common';
import { OverviewSection } from '../overview/section';

const featureColors = {
  red: '#E99797',
  orange: '#F6B580',
  yellow: '#FFEB85',
  green: '#96BE98',
  blue: '#8CBAE8',
  purple: '#726DA8',
  pink: '#FFADE5',
  grey: '#DDDDDD',
};

export const GamesPage = () => {
  return (
    <FeatureLayout
      maxWidth={'md'}
      HeaderProps={{
        title: `Browser Games`,
        subtitle: `All of our games are browser-based, **ad-free** and free-to-play. Each game supports a different charity or non-profit organization. Learn more about our mission to [help struggling communities here](${urls.app.missionStatement}).`,
        src: '/art/game-console.svg',
      }}
    >
      <Flex column fullWidth gap={6} pb={6}>
        <OverviewSection
          title="Quench the world's thirst"
          subtitle={`We've partnered with [Water.org](${urls.external.waterOrg}) and [Charity: Water](${urls.external.charityWater}) to help provide clean water to struggling people around the world.`}
          features={[
            {
              isNew: true,
              color: featureColors.purple,
              title: 'Word Pack',
              subtitle: 'A fill-in-the-blanks crossword game.',
              src: '/games/word-pack.svg',
              href: urls.games.wordPack,
            },
            {
              isNew: true,
              color: featureColors.blue,
              title: 'Word Search',
              subtitle: 'Find and highlight words in a grid of letters.',
              src: '/games/word-search.svg',
              href: urls.games.wordSearch,
            },
            {
              color: featureColors.yellow,
              title: 'Puzzle Words',
              subtitle: 'A puzzle game that helps you learn new words.',
              src: '/games/puzzle-words.png',
              href: urls.games.puzzleWords,
            },
            {
              color: featureColors.pink,
              title: 'Word Smith',
              subtitle: 'Find the secret word from a random list of letters.',
              src: '/games/word-smith.svg',
              href: urls.games.wordSmith,
            },
            {
              color: featureColors.green,
              title: 'Emoji War',
              subtitle: 'A fast-paced, multiplayer, emoji-themed game.',
              src: '/games/emoji-war.png',
              href: urls.games.emojiWar,
            },
          ]}
        />
        <OverviewSection
          title="Put an end to homelessness "
          subtitle={`We've partnered with [HomeFirst](${urls.external.homeFirst}) to help provide housing to homeless people in the Bay Area. These games donate 100% of their proceeds to this cause.`}
          features={[
            {
              beta: true,
              color: featureColors.red,
              title: 'Dungeon Kata',
              subtitle: 'A multiplayer chess game, with a twist.',
              src: '/games/dungeon-kata.png',
            },
          ]}
        />
      </Flex>
    </FeatureLayout>
  );
};
