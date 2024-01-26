import { CategoryProps } from '../components';

export const GAME_CATEGORIES: CategoryProps[] = [
  {
    id: 'word',
    name: 'Word Games',
    image: '/games/c/game.png',
  },
  {
    id: 'ad-free',
    name: 'Ad-Free Games',
    image: '/games/c/game.png',
  },
  {
    id: 'popular',
    name: 'Popular Games',
    image: '/games/c/game.png',
  },
  {
    id: 'mobile',
    name: 'Mobile Games',
    image: '/games/c/game.png',
  },
  {
    id: 'board',
    name: 'Board Games',
    image: '/games/c/game.png',
  },
  {
    id: 'action',
    name: 'Action Games',
    image: '/games/c/game.png',
  },
  {
    id: 'adventure',
    name: 'Adventure Games',
    image: '/games/c/game.png',
  },
  {
    id: 'car',
    name: 'Car Games',
    image: '/games/c/game.png',
  },
  {
    id: 'ball',
    name: 'Ball Games',
    image: '/games/c/game.png',
  },
  {
    id: 'arcade',
    name: 'Arcade Games',
    image: '/games/c/game.png',
  },
  {
    id: 'gun',
    name: 'Gun Games',
    image: '/games/c/game.png',
  },
  {
    id: 'puzzle',
    name: 'Puzzle Games',
    image: '/games/c/game.png',
  },
].map((category) => ({
  id: category.id,
  color: 'warning',
  text: category.name.split(' ').join('\n'),
  imageSrc: category.image,
}));
