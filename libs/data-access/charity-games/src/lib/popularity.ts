import { GamePopularityStatistics } from '@worksheets/util/types';

export const popularityStatisticsTemplate: GamePopularityStatistics = {
  countries: [
    { name: 'United States', percent: 70 },
    { name: 'United Kingdom', percent: 4 },
    { name: 'India', percent: 4 },
    { name: 'Germany', percent: 2 },
    { name: 'Argentina', percent: 1 },
    { name: 'Canada', percent: 1 },
    { name: 'Pakistan', percent: 1 },
    { name: 'Brazil', percent: 1 },
    { name: 'France', percent: 1 },
    { name: 'Netherlands', percent: 1 },
  ],
  games: [
    { id: 'puzzle-words', name: 'Puzzle Words', plays: 128 },
    { id: 'word-search', name: 'Word Search', plays: 68 },
    { id: 'emoji-war', name: 'Emoji War', plays: 31 },
    { id: 'solitaire', name: 'Solitaire', plays: 29 },
    { id: 'word-pack', name: 'Word Pack', plays: 28 },
    { id: 'word-smith', name: 'Word Smith', plays: 11 },
    { id: 'nonograms', name: 'Nonograms', plays: 6 },
  ],
  players: {
    new: 512,
    returning: 43,
  },
  uniqueGames: 0,
};
