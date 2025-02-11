'use client';

import { Box, Link, Typography } from '@mui/material';
import { contestsRoutes, portalRoutes } from '@worksheets/routes';
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
        <Link href={portalRoutes.account.inventory.url()}>your account</Link>.
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
          href={portalRoutes.account.inventory.path({
            bookmark: InventoryPanels.ActivationCodes,
          })}
        >
          Activation Codes Section
        </Link>
        .
      </Typography>
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
        <Link href={contestsRoutes.raffles.path()}>Contests</Link>.
      </Box>
    ),
  },
];
