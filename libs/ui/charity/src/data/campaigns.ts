import { CharityCampaign } from '../types';

export const campaigns: Record<string, CharityCampaign> = {
  primary: {
    organizationId: 'water-org',
    pledge: { required: 100, current: 20, games: 7, players: 55 },
    statistics: {
      countries: [
        { name: 'United States', hours: 9 },
        { name: 'India', hours: 5 },
        { name: 'United Kingdom', hours: 3 },
        { name: 'Australia', hours: 2 },
        { name: 'Germany', hours: 2 },
        { name: 'Brazil', hours: 1 },
        { name: 'Canada', hours: 1 },
        { name: 'France', hours: 1 },
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
        new: 45,
        returning: 10,
      },
    },
  },
};
