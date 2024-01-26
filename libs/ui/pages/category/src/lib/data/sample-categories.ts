export const sampleCategories = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: `Category ${i}`,
  image: 'https://picsum.photos/300/300',
}));
