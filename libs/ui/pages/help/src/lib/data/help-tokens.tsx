import { Box, Link, Typography } from '@mui/material';
import { toPercentage } from '@worksheets/util/numbers';
import {
  GIFT_BOX_DROP_RATE,
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_IN_GIFT_BOX,
} from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpTokens: QuestionAnswer[] = [
  {
    id: 'what-are-tokens',
    question: 'What are Tokens?',
    summary:
      'Tokens are a virtual currency that you can use to enter raffles and win prizes.',
    answer: (
      <Box>
        <Typography>
          Tokens are a virtual currency that you can use to enter raffles and
          win prizes. You can earn tokens by playing games, participating in
          events, and sending Gift Boxes to your friends. You can also purchase
          tokens from the Token Store.
          <br />
          <br />
          Tokens are used to enter raffles. The more tokens you use to enter a
          raffle, the better your chances of winning. You can also use tokens to
          purchase items from the Token Store.
        </Typography>
        <HelpfulLinks
          links={[
            {
              href: '/help/playing-games',
              text: 'Learn more about Playing Games',
            },
            { href: '/help/gift-boxes', text: 'Learn more about Gift Boxes' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-do-i-earn-tokens',
    question: 'How do I earn Tokens?',
    summary:
      'You can earn tokens by playing games, participating in events, and sending Gift Boxes to your friends.',
    answer: (
      <Box>
        <Typography>
          You can earn tokens by playing games, participating in events, sending
          Gift Boxes to your friends, and referring new users.
          <br />
          <br />
          In the future players will be able to earn tokens through direct
          donations to charity. Organizations like the American Red Cross, the
          World Wildlife Fund, Water.Org, and the United Way will be available
          for donations.
          <br />
          <br />
          These donations will be converted into tokens and added to your
          account.
        </Typography>
        <HelpfulLinks
          links={[
            {
              href: '/help/playing-games',
              text: 'Learn more about Playing Games',
            },
            { href: '/help/gift-boxes', text: 'Learn more about Gift Boxes' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'what-can-i-do-with-tokens',
    question: 'What can I do with Tokens?',
    summary: 'You can use tokens to enter raffles and win prizes.',
    answer: (
      <Box>
        <Typography>
          You can use tokens to enter raffles and win prizes. The more tokens
          you use to enter a raffle, the better your chances of winning. You can
          also use tokens to purchase items from the Token Store.
          <br />
          <br />
          You can earn tokens by playing games, participating in events, and
          sending Gift Boxes to your friends. You can also purchase tokens from
          the Token Store.
        </Typography>
        <HelpfulLinks
          links={[
            {
              href: '/help/playing-games',
              text: 'Learn more about Playing Games',
            },
            { href: '/help/gift-boxes', text: 'Learn more about Gift Boxes' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'what-is-a-gift-box',
    question: 'What is a Gift Box?',
    summary: `A Gift Box is a special item that contains tokens. You can send Gift Boxes to your friends to help them enter raffles and win prizes.`,
    answer: (
      <Box>
        <Typography>
          A Gift Box is a special item that contains tokens. You can send Gift
          Boxes to your friends to help them enter raffles and win prizes. Every
          time you send a Gift Box to a friend, you will receive a gift box in
          return.
          <br />
          <br />A Gift Box can contain a random number of tokens up to{' '}
          {MAX_TOKENS_IN_GIFT_BOX} tokens in each box.
          <br />
          <br />
          Gift Boxes can only be sent to friends that you added and you can only
          send one Gift Box to each friend every 24 hours. You can send a
          maximum of {MAX_DAILY_GIFT_BOX_SHARES} Gift Boxes per day.{' '}
          <Link href="/learn/vip">VIP members</Link> can send more Gift Boxes
          every day.
          <br />
          <br />
          You can also find Gift Boxes while playing games, entering raffles,
          and participating in events. The drop rate for Gift Boxes is
          approximately
          {toPercentage(GIFT_BOX_DROP_RATE)}%. This rate is increased for{' '}
          <Link href="/learn/vip">VIP members</Link>.
        </Typography>
        <HelpfulLinks
          links={[
            { href: '/help/tokens', text: 'Learn more about Tokens' },
            {
              href: '/help/vip',
              text: 'Learn more about VIP',
            },
            {
              href: '/help/playing-games',
              text: 'Learn more about Playing Games',
            },
          ]}
        />
      </Box>
    ),
  },
];
