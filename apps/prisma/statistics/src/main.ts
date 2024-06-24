import {
  CAPSULE_PREMIUM_DROP_RATE,
  COMBAT_ITEM_DAMAGE,
  CONSUMPTION_RATES,
  ITEMS,
  SHARE_RATES,
} from '@worksheets/data/items';
import { MOBS } from '@worksheets/data/mobs';
import { Item, prisma } from '@worksheets/prisma';
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

const calculateMonsterRelativeDropValues = async () => {
  const monsterId = await questionAsync('Enter the monster ID: ');
  const mob = MOBS.find((mob) => mob.id === parseInt(monsterId));
  if (!mob) {
    console.error('Invalid monster ID');
    return await main();
  }
  const drops = mob.loot;
  let sum = 0;
  console.debug();
  console.debug(`Monster (ID-${monsterId}): ${mob.name}`);
  for (const drop of drops) {
    // find the item in the database
    const item = ITEMS.find((item) => item.id === drop.itemId);
    if (!item) {
      console.error('Invalid item ID');
      return await main();
    }
    const value = computeItemValue(item as Item);
    const dropValue = value * drop.chance * drop.quantity;
    console.debug(
      `Item: ${item.name}, Value: ${value}, Drop Chance: ${drop.chance}, Estimated Drop Value: ${dropValue}`
    );
    sum += dropValue;
  }

  console.debug('Total Estimated Drop Value:', sum);
  console.debug('Monster HP:', mob.maxHp);
  console.debug();
  await calculateMonsterRelativeDropValues();
};

const STEAM_KEY_VALUE = 10000;
const RANDOM_ITEM_VALUE = 100;
const computeItemValue = (item: Item, nested?: boolean) => {
  switch (item.type) {
    case 'CURRENCY':
      return 1;
    case 'STEAM_KEY':
      return STEAM_KEY_VALUE;
    case 'CONSUMABLE': {
      const rates = CONSUMPTION_RATES[item.id];
      if ('min' in rates && 'max' in rates) {
        return (rates.min + rates.max) / 2;
      }
      if (nested) return RANDOM_ITEM_VALUE;
      return Math.floor(
        rates.items.reduce(
          (acc, item) => acc + computeItemValue(item, true),
          0
        ) / rates.items.length
      );
    }
    case 'SHARABLE': {
      const rate = SHARE_RATES[item.id];
      return rate.user + rate.friend;
    }
    case 'COMBAT':
      return COMBAT_ITEM_DAMAGE[item.id];
    case 'ETCETERA':
      return item.sell;
    case 'CAPSULE':
      return STEAM_KEY_VALUE * CAPSULE_PREMIUM_DROP_RATE[item.id];
    case 'PRIZE_WHEEL':
      return RANDOM_ITEM_VALUE; // estimate value.
  }
};

async function main() {
  try {
    console.debug('Charity Games Statistics');
    console.debug('1. Number of Ad Impressions by Raffle');
    console.debug('2. Monster Relative Drop Values');
    const option = await questionAsync('Choose an option: ');
    console.debug('\nYou chose option:', option);
    switch (option) {
      case '1':
        return await calculateAdImpressionsByRaffle();
      case '2':
        return await calculateMonsterRelativeDropValues();
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
