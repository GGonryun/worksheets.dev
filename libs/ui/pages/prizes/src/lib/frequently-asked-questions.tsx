import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Description } from '@worksheets/ui/components/description';
import { Questions } from '@worksheets/ui/components/qa-section';
import { HelpfulLinks } from '@worksheets/ui/pages/help';
import { ListItem, OrderedList, useBookmark } from '@worksheets/ui-core';
import { InventoryPanels } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';
import React from 'react';

export const FrequentlyAskedQuestions: React.FC = () => {
  const bookmark = useBookmark();
  return (
    <Description
      title="Frequently Asked Questions"
      color="secondary"
      description={
        <Box mt={{ xs: 3, sm: 4 }}>
          <Questions qa={faq} bookmark={bookmark} />
        </Box>
      }
    />
  );
};

const faq: QuestionAnswer[] = [
  {
    id: '1',
    question: 'How do I redeem prizes?',
    answer: (
      <Typography>
        In order to redeem a prize, you must first earn enough tokens to unlock
        it. Once you have enough tokens, you can click on a prize to view it's
        details. From there, you can click the "Redeem" button to claim your
        prize.
        <br />
        <br />
        Every 24 hours, a new set of prizes will be available for redemption
        with varying discounts. Be sure to check back daily to see what's new!
        <br />
        <br />
        Players are only allowed to redeem one prize per day. If you have any
        questions or concerns, please contact support.
        <br />
        <br />
        <Link href={routes.contact.path()} color="primary">
          Contact Support for Help
        </Link>
      </Typography>
    ),
  },
  {
    id: '2',
    question: 'How do I get tokens?',
    answer: (
      <Box>
        Prizes can be redeemed by spending tokens earned from:
        <OrderedList>
          <ListItem disablePadding>Playing games at the arcade</ListItem>
          <ListItem disablePadding>Participating on Leaderboards</ListItem>
          <ListItem disablePadding>Unlocking achievements</ListItem>
          <ListItem disablePadding>Winning giveaways and raffles</ListItem>
          <ListItem disablePadding>Completing quests</ListItem>
        </OrderedList>
        <br />
        <HelpfulLinks
          links={[
            { href: routes.play.path(), text: 'Play Arcade Games' },
            {
              href: routes.raffles.path(),
              text: 'Enter Giveaways',
            },
            {
              href: routes.account.quests.path(),
              text: 'Complete Quests',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: '3',
    question: 'Where can I see my prize?',
    answer: (
      <Typography>
        All prizes are unlocked as activation codes that can be seen in your
        account page. You can access your account page by clicking on your
        profile icon in the top right corner of the screen and going to your
        inventory. The "Activation Codes" tab will show you all the prizes you
        have unlocked.
        <br />
        <br />
        Alternatively, you can click{' '}
        <Link
          href={routes.account.inventory.path({
            bookmark: InventoryPanels.ActivationCodes,
          })}
          color="primary"
        >
          this link to view your Activation Codes
        </Link>
        .
      </Typography>
    ),
  },
  {
    id: '4',
    question: "I don't see my prize in my inventory",
    answer: (
      <Typography>
        If you have redeemed a prize but do not see it in your inventory, please
        contact support. Be sure to include your username and the prize you
        redeemed in your message.
        <br />
        <br />
        <Link href={routes.contact.path()} color="primary">
          Contact Support for Help
        </Link>
      </Typography>
    ),
  },
  {
    id: '5',
    question: "Can I get a refund for a prize I've redeemed?",
    answer: (
      <Typography>
        Once a prize has been redeemed, it cannot be refunded. If you have any
        questions or concerns, please contact support.
        <br />
        <br />
        <Link href={routes.contact.path()} color="primary">
          Contact Support for Help
        </Link>
      </Typography>
    ),
  },
];
