import { prisma } from '@worksheets/prisma';

import { insertItems } from './insert-items';

async function main() {
  try {
    await insertItems();
  } catch (error) {
    console.error(error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
