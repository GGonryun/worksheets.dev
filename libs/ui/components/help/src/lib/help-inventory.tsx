import { Box, Link, Typography } from '@mui/material';
import { ItemRarity } from '@prisma/client';
import {
  CAPSULE_DROP_RATES,
  CAPSULE_PREMIUM_DROP_RATE,
  CapsuleItemId,
  PREMIUM_ITEMS,
} from '@worksheets/data/items';
import { routes } from '@worksheets/routes';
import { itemRarityLabel } from '@worksheets/ui/components/items';
import { HelpInventoryQuestions, SettingsPanels } from '@worksheets/util/enums';
import { toPercentage } from '@worksheets/util/numbers';
import { QuestionAnswer } from '@worksheets/util/types';

const CapsuleDropRates: React.FC<{ id: CapsuleItemId }> = ({ id }) => {
  const premiums = CAPSULE_PREMIUM_DROP_RATE[id];
  const rates = CAPSULE_DROP_RATES[id];
  return (
    <span>
      <b>{toPercentage(premiums)} chance</b> of containing a{' '}
      <Link
        href={routes.help.inventory.path({
          bookmark: HelpInventoryQuestions.Premium,
        })}
      >
        premium item
      </Link>
      . Each of the remaining items has the following appearance rates:
      <ul>
        {[
          ItemRarity.COMMON,
          ItemRarity.UNCOMMON,
          ItemRarity.RARE,
          ItemRarity.LEGENDARY,
          ItemRarity.MYTHIC,
        ].map((rarity) => (
          <li key={rarity}>
            <b>{itemRarityLabel[rarity]}</b> — {toPercentage(rates[rarity])}
          </li>
        ))}
      </ul>
    </span>
  );
};

export const helpInventory: QuestionAnswer[] = [
  {
    id: HelpInventoryQuestions.Description,
    question: 'What is the inventory?',
    summary:
      'The inventory is where you can view and manage your digital and physical prizes.',
    answer: (
      <Typography component="div" fontWeight={500}>
        The inventory is where you can view and manage your digital prizes and
        in game items. You can view your inventory by visiting{' '}
        <Link href={routes.account.path()}>your account</Link>.
        <br />
        <br />
        There are many different types of items in your inventory such as:
        <ul>
          <li>
            <b>Currency</b> — Items that can be used to purchase other items
          </li>
          <li>
            <b>Consumables</b> — Items that can only be used once but will
            provide some immediate benefit such as tokens.
          </li>
          <li>
            <b>Steam Key</b> — A special code that can be redeemed on Steam for
            a game. Steam keys are usually won in raffles and will expire if not
            redeemed after a certain period of time.
          </li>
          <li>
            <b>Et Cetera</b> — Items that are used for crafting other items or
            selling for currency.
          </li>
        </ul>
      </Typography>
    ),
  },
  {
    id: HelpInventoryQuestions.FindingItems,
    question: 'How do I find items for my inventory?',
    summary: 'Learn how to find items for your inventory.',
    answer: (
      <Typography>
        You can find items for your inventory by{' '}
        <Link href={routes.play.path()}>playing games</Link>,{' '}
        <Link href={routes.raffles.path()}>winning raffles</Link>, or by{' '}
        <Link href={routes.help.quests.path()}>completing quests</Link>.
      </Typography>
    ),
  },
  {
    id: HelpInventoryQuestions.Claiming,
    question: 'How do I claim items?',
    summary: 'Learn how to claim items for your inventory.',
    answer: (
      <Typography>
        Items such as Steam Keys must be claimed within a certain period of time
        or they will expire. To claim an item, visit your inventory and click
        the on the item that you want to claim.
        <br />
        <br />
        When the details of the item are displayed, click the "Use Item" button
        to receive the activation code for the item.
        <br />
        <br />
        The first time you claim an item, you will be emailed the activation
        code, so make sure to check your email. You can also view the activation
        code by visiting your inventory and clicking on the{' '}
        <Link
          href={routes.account.path({
            bookmark: SettingsPanels.ActivationCodes,
          })}
        >
          Activation Codes Section
        </Link>
        .
      </Typography>
    ),
  },
  {
    id: HelpInventoryQuestions.Capsules,
    question: 'What are Mystery Capsules?',
    summary:
      'Mystery Capsules are a special type of item that can be opened to reveal a random prize.',
    answer: (
      <Box>
        Mystery Capsules are a special type of item that can be opened to reveal
        a random prize. The prize can be anything from tokens to a Steam Key.
        <br />
        <br />
        To open a Mystery Capsule, visit your inventory and click on the capsule
        that you want to open. When the details of the capsule are displayed,
        click the "Open Capsule" button to reveal your prize. Every capsule
        contains 9 item slots for you to pick from. The first time you open any
        capsule you will be given 5 free picks to get you started. After that
        you can unlock more picks by watching ads.
        <br />
        <h3 style={{ marginBottom: 0 }}>
          <u>Capsule Drop Rate Table</u>
        </h3>
        <ul style={{ marginTop: 4 }}>
          <li>
            <b>Bronze Capsule</b> — <CapsuleDropRates id={'100'} />
          </li>
          <li>
            <b>Silver Capsule</b> — <CapsuleDropRates id={'101'} />
          </li>
          <li>
            <b>Gold Capsule</b> — <CapsuleDropRates id={'102'} />
          </li>
          <li>
            <b>Platinum Capsule</b> — <CapsuleDropRates id={'103'} />
          </li>
          <li>
            <b>Diamond Capsule</b> - <CapsuleDropRates id={'104'} />
          </li>
          <li>
            <b>Legendary Capsule</b> - <CapsuleDropRates id={'105'} />
          </li>
          <li>
            <b>Mythical Capsule</b> - <CapsuleDropRates id={'106'} />
          </li>
        </ul>
      </Box>
    ),
  },
  {
    id: HelpInventoryQuestions.Premium,
    question: 'What are Premium Items?',
    summary:
      'Premium items are special items that usually have a monetary value associated with them.',
    answer: (
      <Box>
        Premium items are special items that usually have a monetary value
        associated with them. Premium items can be found in{' '}
        <Link
          href={routes.help.inventory.path({
            bookmark: HelpInventoryQuestions.Capsules,
          })}
        >
          Mystery Capsules
        </Link>
        , and <Link href={routes.raffles.path()}>Raffles</Link>. Premium items
        are usually more rare than other items.
        <br />
        <br />
        The current list of premium items are:
        <ul>
          {PREMIUM_ITEMS.map((item) => (
            <li key={item.id}>
              <Link href={routes.item.path({ params: { itemId: item.id } })}>
                {item.name}
              </Link>{' '}
              — {item.description}
            </li>
          ))}
        </ul>
      </Box>
    ),
  },
];
