import { BasicCategoryInfo } from '@worksheets/util/types';

export const sampleCategories: BasicCategoryInfo[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: i.toString(),
  name: `Category ${i}`,
  image: 'https://via.placeholder.com/150',
}));
