import {
  CAPSULE_PREMIUM_DROP_RATE,
  COMBAT_ITEM_DAMAGE,
  CONSUMPTION_RATES,
  ITEMS,
  SHARE_RATES,
} from '@worksheets/data/items';
import { MOBS } from '@worksheets/data/mobs';
import { Item, prisma } from '@worksheets/prisma';
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

const calculateEstimatedDropValue = (
  drops: {
    itemId: string;
    quantity: number;
    chance: number;
    mvp: boolean;
  }[]
) => {
  let sum = 0;
  const chanceSum = drops.reduce((acc, drop) => acc + drop.chance, 0);

  for (const drop of drops) {
    // find the item in the database
    const item = ITEMS.find((item) => item.id === drop.itemId);
    if (!item) {
      throw Error(`Item not found: ${drop.itemId}`);
    }
    const value = computeItemValue(item as Item);
    const dropValue = value * drop.quantity * (drop.chance / chanceSum);
    console.debug(
      `${drop.mvp ? '[MVP] ' : ''}Item: ${
        item.name
      }, Value: ${value}, Drop Chance: ${(drop.chance / chanceSum).toFixed(
        2
      )}, Estimated Drop Value: ${dropValue.toFixed(2)}`
    );
    sum += dropValue;
  }
  console.log('Total Drop Chance:', chanceSum.toFixed(2));
  return { sum };
};

const calculateMonsterRelativeDropValues = async (id?: string) => {
  let monsterId = id;
  if (!monsterId) {
    monsterId = await questionAsync('Enter the monster ID: ');
  }

  const mob = MOBS.find((mob) => mob.id === parseInt(monsterId));
  if (!mob) {
    console.error('Invalid monster ID');
    return await main();
  }
  const nonMvpDrops = mob.loot.filter((drop) => !drop.mvp);
  console.debug();
  console.debug(`Monster (ID-${monsterId}): ${mob.name}`);
  const nonMvp = calculateEstimatedDropValue(nonMvpDrops);
  const mvpDrops = mob.loot.filter((drop) => drop.mvp);
  const mvp = calculateEstimatedDropValue(mvpDrops);

  const defenseBonus = 10;
  const basicMultiplier = 7;
  const mvpMultiplier = 5;
  const averageDropValue = nonMvp.sum / nonMvpDrops.length;
  const averageMvpDropValue = Math.floor(mvp.sum / mvpDrops.length);
  const suggestedHp = Math.floor(averageMvpDropValue * mvpMultiplier);
  const suggestedDefense =
    Math.floor(averageDropValue * basicMultiplier) + defenseBonus;
  const estimatedItemsDropped = Math.floor(suggestedHp / suggestedDefense);
  const totalEstimatedValue = Math.floor(
    estimatedItemsDropped * averageDropValue + averageMvpDropValue
  );

  console.debug('Average EDV:', averageDropValue);
  console.debug('Average MVP EDV:', averageMvpDropValue);
  console.debug('Suggested Defense:', suggestedDefense);
  console.debug('Suggested HP:', suggestedHp);
  console.debug('Estimated Items Dropped:', estimatedItemsDropped);
  console.debug('Estimated Total Value:', totalEstimatedValue);
  console.debug();

  await calculateMonsterRelativeDropValues();
};

const STEAM_KEY_VALUE = 15000;
const RANDOM_ITEM_VALUE = 200;
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
    console.log(process.argv[2]);
    const idArg = process.argv[2] ?? '';
    const id = idArg.split('=')[1];
    return await calculateMonsterRelativeDropValues(id);
  } catch (error) {
    console.error(error);
    await main();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
