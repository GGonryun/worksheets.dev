import { prisma } from '@worksheets/prisma';
import { exit } from 'process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionAsync = (question: string) => {
  return new Promise<string>((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const calculateAdImpressionsByRaffle = async () => {
  const raffleId = await questionAsync('Enter the raffle ID: ');
  const impressions = await prisma.raffleParticipation.aggregate({
    where: {
      raffleId: parseInt(raffleId),
    },
    _count: true,
  });

  console.debug();
  console.debug('Number of Participants:', impressions._count);
  console.debug('TODO: Calculate ad impressions');
  console.debug();
  await main();
};

async function main() {
  try {
    console.debug('Charity Games Statistics');
    console.debug('1. Number of Ad Impressions by Raffle');
    const option = await questionAsync('Choose an option: ');
    console.debug('\nYou chose option:', option);
    switch (option) {
      case '1':
        return await calculateAdImpressionsByRaffle();
      default:
        console.debug('Invalid option');
        exit(1);
    }
  } catch (error) {
    console.error(error);
    exit(1);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
