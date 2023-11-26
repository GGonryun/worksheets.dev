import { GameTags, TagSchema } from '../types/tag-schema';

export const tags: Record<GameTags, TagSchema> = {
  board: {
    id: 'board',
    name: 'Board Games',
    iconUrl: '/assets/categories/board.svg',
  },
  puzzle: {
    id: 'puzzle',
    name: 'Puzzle Games',
    iconUrl: '/assets/categories/puzzle.svg',
  },
  brain: {
    id: 'brain',
    name: 'Brain Games',
    iconUrl: '/assets/categories/brain.svg',
  },
  card: {
    id: 'card',
    name: 'Card Games',
    iconUrl: '/assets/categories/card.svg',
  },
  new: {
    id: 'new',
    name: 'New Games',
    iconUrl: '/assets/categories/new.svg',
  },
  popular: {
    id: 'popular',
    name: 'Popular Games',
    iconUrl: '/assets/categories/popular.svg',
  },
  'top-rated': {
    id: 'top-rated',
    name: 'Top Rated Games',
    iconUrl: '/assets/categories/top-rated.svg',
  },
  mobile: {
    id: 'mobile',
    name: 'Mobile Games',
    iconUrl: '/assets/categories/mobile.svg',
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop Games',
    iconUrl: '/assets/categories/desktop.svg',
  },
};

export const tagIds = Object.keys(tags) as GameTags[];
export const tagSchemas = Object.values(tags) as TagSchema[];
