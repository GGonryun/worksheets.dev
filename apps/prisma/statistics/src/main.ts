import { prisma } from '@worksheets/prisma';

async function main() {
  console.log('not implemented');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
