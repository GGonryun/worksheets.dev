import { BasicCategoryInfo } from '../components/types/category-info';

export const sampleCategories: BasicCategoryInfo[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: i.toString(),
  name: `Category ${i}`,
  image: '/games/c/game.png',
}));
