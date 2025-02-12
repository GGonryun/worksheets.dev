import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { SettingsPanels } from '@worksheets/util/enums';
import { toPercentage } from '@worksheets/util/numbers';
import {
  MAX_PRIZE_DISCOUNT,
  MIN_PRIZE_DISCOUNT,
  PRIZE_WALL_INTERVAL,
} from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';
export const helpPrizeWall: QuestionAnswer[] = [
  {
    id: 'redeem-prize',
    question: 'How do I redeem prizes?',
    summary:
      'Redeem a prize by earning enough tokens to unlock it. Every 24 hours, a new set of prizes will be available for redemption with varying discounts.',
    answer: (
      <Typography>
        In order to redeem a prize, you must first earn enough tokens to unlock
        it. Once you have enough tokens, you can click on a prize to view it's
        details. From there, you can click the "Redeem" button to claim your
        prize.
        <br />
        <br />
        Every {PRIZE_WALL_INTERVAL} hours, a new set of prizes will be available
        for redemption with varying discounts. Discounts range from{' '}
        {toPercentage(MIN_PRIZE_DISCOUNT)} to {toPercentage(MAX_PRIZE_DISCOUNT)}
        . Be sure to check back often to see what's new!
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
    id: 'getting-tokens',
    question: 'How do I get tokens?',
    summary:
      'Earn tokens by playing games, participating in leaderboards, unlocking achievements, or winning giveaways and raffles.',
    answer: (
      <Box>
        Prizes can be redeemed by spending tokens earned from:
        <OrderedList>
          <ListItem disablePadding>Playing games at the arcade</ListItem>
          <ListItem disablePadding>Participating on Leaderboards</ListItem>
          <ListItem disablePadding>Unlocking achievements</ListItem>
          <ListItem disablePadding>Winning giveaways and raffles</ListItem>
        </OrderedList>
        <br />
        <HelpfulLinks
          links={[
            { href: routes.play.path(), text: 'Play Arcade Games' },
            {
              href: routes.raffles.path(),
              text: 'Enter Giveaways',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'see-prize',
    question: 'Where can I see my prize?',
    summary:
      'All prizes are unlocked as activation codes that can be seen in your account page.',
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
          href={routes.account.path({
            bookmark: SettingsPanels.ActivationCodes,
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
    id: 'prize-not-in-inventory',
    question: "I don't see my prize in my inventory",
    summary:
      'If you have redeemed a prize but do not see it in your inventory, please contact support.',
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
    id: 'refund-prize',
    question: "Can I get a refund for a prize I've redeemed?",
    summary:
      'Once a prize has been redeemed, it cannot be refunded. If you have any questions or concerns, please contact support.',
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
