import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import {
  HelpQuestsQuestions,
  HelpTokensQuestions,
} from '@worksheets/util/enums';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

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
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
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
          completing tasks, and referring new users. Below is a list of each way
          to earn tokens and the maximum amount of tokens you can earn from each
          method.
        </Typography>
        <OrderedList>
          <ListItem>
            <Link href={routes.help.playingGames.path()}>Playing Games</Link> -
            Certain games will reward you with tokens for playing. The amount of
            tokens you earn depends on the game.
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.quests.path({
                bookmark: HelpQuestsQuestions.Description,
              })}
            >
              Quests
            </Link>{' '}
            - Varies by quests, all quests will have a token reward
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.tokens.path({
                bookmark: HelpTokensQuestions.Referrals,
              })}
            >
              New Referrals
            </Link>{' '}
            - Earn {TOKENS_PER_REFERRAL_ACCOUNT} tokens when a new user signs up
            with your referral link.
          </ListItem>
          <ListItem>
            <Link href={routes.help.friends.path()}>Friends</Link> - Reward your
            best friends with extra tokens when you play games.
          </ListItem>
          <ListItem>
            <Link href={routes.help.vip.path()}>VIP Membership</Link> - VIP
            members earn more rewards and gain access to exclusive features.
          </ListItem>
        </OrderedList>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.help.quests.path(),
              text: 'Quests',
            },
            {
              href: routes.help.friends.path(),
              text: 'Friends',
            },
            {
              href: routes.help.referrals.path(),
              text: 'Referrals',
            },
            {
              href: routes.account.quests.path(),
              text: 'View your tokens',
            },
            { href: routes.help.vip.path(), text: 'VIP Benefits' },
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
          participating in events, sending Gift Boxes to your friends,
          completing quests, and referring new users.
          <br />
          <br />
          These donations will be converted into tokens and added to your
          account.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.help.quests.path({
                bookmark: HelpQuestsQuestions.Description,
              }),
              text: 'Learn more about Quests',
            },
            {
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
            },
            {
              href: routes.help.friends.path(),
              text: 'Learn more about Friends',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.Referrals,
              }),
              text: 'Learn more about Referrals',
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
        <br />
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
        <br />
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
];
