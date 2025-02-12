import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { HelpReferralsQuestions, SettingsPanels } from '@worksheets/util/enums';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

export const helpReferrals: QuestionAnswer[] = [
  {
    id: HelpReferralsQuestions.Description,
    question: 'What are Referrals?',
    summary:
      'Referrals are a way to invite your friends to join the community.',
    answer: (
      <Box>
        <Typography>
          Referrals are a way to invite your friends to join the community. When
          you refer a friend, you will receive a bonus when they sign up and
          start playing games. You can refer friends by sharing your referral
          link or by sending them an invitation through email or social media.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.account.path({
                bookmark: SettingsPanels.Referrals,
              }),
              text: `Share your referral link`,
            },
            { href: routes.account.path(), text: 'Create an account' },
            {
              href: routes.help.tokens.path(),
              text: 'Learn more about Tokens',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpReferralsQuestions.Benefits,
    question: 'What are the benefits of Referrals?',
    summary:
      "Referrals are a way to invite your friends to join the community. You'll receive a bonus when they sign up and start playing games.",
    answer: (
      <Box>
        <Typography>
          Referrals are a way to invite your friends to join the community. When
          you refer a friend, you will receive a bonus when they sign up and
          start playing games. You can refer friends by sharing your referral
          link or by sending them an invitation through email or social media.
        </Typography>
        <br />
        <Typography>
          Referrals are the easiest way to earn tokens. When you refer a friend
          you'll receive a bonus when they sign up and you'll get bonus tokens
          every time someone you referred plays a game.
        </Typography>
        <HelpfulLinks
          links={[
            {
              href: routes.account.path({
                bookmark: SettingsPanels.Referrals,
              }),
              text: `Share your referral link`,
            },
            {
              href: routes.help.tokens.path(),
              text: 'Learn more about Tokens',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpReferralsQuestions.Earnings,
    question: 'How much do I earn?',
    summary: `You can earn up to ${TOKENS_PER_REFERRAL_ACCOUNT} tokens for each friend you refer.`,
    answer: (
      <Box>
        <Typography>
          You will earn {TOKENS_PER_REFERRAL_ACCOUNT} tokens for each friend you
          refer that signs up and makes an account.
        </Typography>
        <br />
        <Typography>
          <Link href={routes.help.vip.path()}>VIP members</Link> receive more
          tokens from referral plays and have an increased referral limit. They
          also receive larger bonuses for each friend they refer.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.account.path({
                bookmark: SettingsPanels.Referrals,
              }),
              text: `Share your referral link`,
            },
            {
              href: routes.help.tokens.path(),
              text: 'Learn more about Tokens',
            },
            { href: routes.help.vip.path(), text: 'Learn more about VIP' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpReferralsQuestions.HowTo,
    question: 'How do I refer a friend?',
    summary: 'You can refer a friend by sharing your referral link.',
    answer: (
      <Box>
        <Typography>
          You can refer a friend by sharing your referral link. You can share
          your referral link through email, social media, or by copying and
          pasting it into a message. Anyone who signs up using your referral
          link within 30 days will be counted as a referral.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.account.path({
                bookmark: SettingsPanels.Referrals,
              }),
              text: `Share your referral link`,
            },
          ]}
        />
      </Box>
    ),
  },
];
