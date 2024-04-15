import { Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import {
  HelpInventoryQuestions,
  InventoryPanels,
} from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

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
        <Link href={routes.account.inventory.path()}>your account</Link>.
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
            <b>Combat</b> — Items that can be used in{' '}
            <Link href={routes.help.mobs.path()}>Boss Battles</Link> to help you
            deal more damage or take less damage.
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
        <Link href={routes.raffles.path()}>winning raffles</Link>,{' '}
        <Link href={routes.help.mobs.path()}>
          defeating enemies in Boss Battles
        </Link>
        , or by <Link href={routes.help.quests.path()}>completing quests</Link>.
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
          href={routes.account.inventory.path({
            bookmark: InventoryPanels.ActivationCodes,
          })}
        >
          Activation Codes Section
        </Link>
        .
      </Typography>
    ),
  },
];
