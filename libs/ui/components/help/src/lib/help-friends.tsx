import { Box, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import {
  HelpFriendsQuestions,
  HelpTokensQuestions,
} from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

export const helpFriends: QuestionAnswer[] = [
  {
    id: HelpFriendsQuestions.Description,
    question: 'What are friends?',
    summary: `Friends are other users who you have added to your friends list. You can send gifts to your friends to help them enter raffles and win prizes.`,
    answer: (
      <Box>
        <Typography>
          Friends are other users that you are following. You can share gifts
          with your friends to help them enter raffles and win prizes.
          <br />
          <br />
          You can also earn tokens for prizes by inviting friends to join
          Charity.Games.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: routes.account.path(), text: 'See Your Friends' },

            {
              href: routes.help.referrals.path(),
              text: 'Learn more about Referrals',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpFriendsQuestions.Followers,
    question: 'What are followers?',
    summary:
      'Followers are other users who have added you to their friends list.',
    answer: (
      <Box>
        <Typography>
          Followers are other users who have added you to their friends list.
          You cannot send gifts to your followers, but you can send gifts to
          your friends. If you add another user's friend code, they will be
          added to your friends list and you will be added to their followers
          list.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: routes.account.path(), text: 'See Your Friends' },
            {
              href: routes.help.referrals.path(),
              text: 'Learn more about Referrals',
            },
          ]}
        />
      </Box>
    ),
  },

  {
    id: HelpFriendsQuestions.WhyInvite,
    question: 'Why should I invite friends?',
    summary: `Invite friends to Charity.Games and earn tokens for prizes!`,
    answer: (
      <Box>
        <Typography>
          Inviting friends to play with you unlocks bonus features such as
          Gifting. Gifting allows you to send tokens to your friends to help
          them enter raffles and win prizes.
          <br />
          <br />
          You can also earn tokens for prizes by inviting friends to join
          Charity.Games.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.help.referrals.path(),
              text: 'Learn more about Referrals',
            },
            {
              href: routes.help.prizes.path(),
              text: 'Learn more about Prizes',
            },
            {
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.Description,
              }),
              text: 'Learn more about Tokens',
            },
          ]}
        />
      </Box>
    ),
  },
];
