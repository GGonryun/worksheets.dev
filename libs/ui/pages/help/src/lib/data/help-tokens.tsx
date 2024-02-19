import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { HelpTokensQuestions } from '@worksheets/util/enums';
import { toPercentage } from '@worksheets/util/numbers';
import {
  BASE_DAILY_REWARD,
  GIFT_BOX_DROP_RATE,
  MAX_DAILY_GIFT_BOX_SHARES,
  MAX_TOKENS_FROM_GAME_PLAY_PER_DAY,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
  MAX_TOKENS_IN_GIFT_BOX,
} from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpTokens: QuestionAnswer[] = [
  {
    id: HelpTokensQuestions.Description,
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
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.GiftBoxes,
              }),
              text: 'Learn more about Gift Boxes',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpTokensQuestions.HowToEarn,
    question: 'How do I earn Tokens?',
    summary:
      'You can earn tokens by playing games, collecting the daily reward, participating in events, and sending Gift Boxes to your friends.',
    answer: (
      <Box>
        <Typography>
          You can earn tokens by playing games, collecting the daily reward,
          participating in events, sending Gift Boxes to your friends, and
          referring new users.
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
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.GiftBoxes,
              }),
              text: 'Learn more about Gift Boxes',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.Referrals,
              }),
              text: 'Learn more about Referrals',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.DailyRewards,
              }),
              text: 'Learn more about Daily Rewards',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpTokensQuestions.Purpose,
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
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
            },
            {
              href: routes.raffles.path(),
              text: 'Enter a Raffle',
            },
            {
              href: routes.prizes.path(),
              text: 'View Prizes',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpTokensQuestions.GiftBoxes,
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
          <Link href={routes.help.vip.path()}>VIP members</Link> can send more
          Gift Boxes every day.
          <br />
          <br />
          You can also find Gift Boxes while playing games, entering raffles,
          and participating in events. The drop rate for Gift Boxes is
          approximately
          {toPercentage(GIFT_BOX_DROP_RATE)}%. This rate is increased for{' '}
          <Link href={routes.help.vip.path()}>VIP members</Link>.
        </Typography>
        <HelpfulLinks
          links={[
            {
              href: routes.help.vip.path(),
              text: 'Learn more about VIP',
            },
            {
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
            },
            {
              href: routes.help.friends.path(),
              text: 'Learn more about Friends',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpTokensQuestions.DailyRewards,
    question: 'What are Daily Rewards?',
    summary:
      'Daily Rewards are a way to earn tokens every day just for logging in.',
    answer: (
      <Box>
        <Typography>
          The daily reward provides you with a small amount of free tokens every
          day that you log in. Currently the daily reward awards all standard
          users with {BASE_DAILY_REWARD} tokens per day.
        </Typography>
        <Typography>
          <Link href={routes.help.vip.path()}>VIP Members</Link> receive a
          larger daily reward.
        </Typography>
        <HelpfulLinks
          links={[
            { href: routes.help.vip.path(), text: 'Learn more about VIP' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpTokensQuestions.Referrals,
    question: 'What are Referrals?',
    summary:
      'Referrals are a way to earn tokens by inviting friends to play games.',
    answer: (
      <Box>
        <Typography>
          Referrals are a way to earn tokens by inviting friends to play games.
          You can earn tokens by referring friends to the platform. You will
          receive a bonus when they sign up and start playing games. You can
          refer friends by sharing your referral link or by sending them an
          invitation through email or social media.
        </Typography>
        <HelpfulLinks
          links={[
            {
              href: routes.account.referrals.path(),
              text: `Share your referral link`,
            },
            {
              href: routes.help.referrals.path(),
              text: 'Learn more about Referrals',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.HowMuchCanIEarn,
              }),
              text: 'How many tokens can I earn every day?',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpTokensQuestions.HowMuchCanIEarn,
    question: 'How many tokens can I earn every day?',
    summary:
      'There are lots of different ways to earn tokens, it depends on what you do and how you are most active',
    answer: (
      <Box>
        <Typography>
          There are many ways to earn tokens. You can earn tokens by playing
          games, participating in events, sending Gift Boxes to your friends,
          claiming the daily reward, and referring new users. Below is a list of
          each way to earn tokens and the maximum amount of tokens you can earn
          from each method.
        </Typography>
        <OrderedList>
          <ListItem>
            <Link href={routes.help.playingGames.path()}>Playing Games</Link> -
            Up to {MAX_TOKENS_FROM_GAME_PLAY_PER_DAY} tokens per day
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.DailyRewards,
              })}
            >
              Daily Rewards
            </Link>{' '}
            - {BASE_DAILY_REWARD} tokens per day
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.GiftBoxes,
              })}
            >
              Sending Gift Boxes
            </Link>{' '}
            - {MAX_DAILY_GIFT_BOX_SHARES} Gift Boxes per day
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.Referrals,
              })}
            >
              Referrals Playing Games
            </Link>{' '}
            - Up to {MAX_TOKENS_FROM_REFERRAL_PLAYS} when referred players play
            games
          </ListItem>
          <ListItem>
            <Link href={routes.help.referrals.path()}>New Referrals</Link>- No
            limit
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.HowToEarn,
              })}
            >
              Participating in Events
            </Link>{' '}
            - Varies by event
          </ListItem>
        </OrderedList>
        <br />
        <Typography variant="body2">
          <Link href={routes.help.vip.path()}>
            VIP Members earn more rewards and have higher limits
          </Link>
        </Typography>
        <HelpfulLinks
          links={[
            { href: routes.help.vip.path(), text: 'VIP' },
            {
              href: routes.help.friends.path(),
              text: 'Friends',
            },
            {
              href: routes.help.referrals.path(),
              text: 'Referrals',
            },
            {
              href: routes.account.tokens.path(),
              text: 'View your tokens',
            },
          ]}
        />
      </Box>
    ),
  },
];
