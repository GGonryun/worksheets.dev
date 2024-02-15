import { Box, Link, Typography } from '@mui/material';
import { ReferralsPanels } from '@worksheets/util/enums';
import {
  GIFT_BOXES_PER_REFERRAL_ACCOUNT,
  MAX_TOKENS_FROM_REFERRAL_PLAYS,
  TOKENS_PER_REFERRAL_ACCOUNT,
  TOKENS_PER_REFERRAL_PLAY,
} from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpReferrals: QuestionAnswer[] = [
  {
    id: 'what-are-referrals',
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
              href: `/account/referrals#${ReferralsPanels.ShareYourLink}`,
              text: `Share your referral link`,
            },
            { href: '/account', text: 'Create an account' },
            {
              href: '/help/tokens',
              text: 'Learn more about Tokens',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'what-are-the-benefits-of-referrals',
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
              href: `/account/referrals#${ReferralsPanels.ShareYourLink}`,
              text: `Share your referral link`,
            },
            { href: '/help/tokens', text: 'Learn more about Tokens' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-much-can-i-earn',
    question: 'How much can I earn?',
    summary: 'You can earn up to 100 tokens for each friend you refer.',
    answer: (
      <Box>
        <Typography>
          You will earn {TOKENS_PER_REFERRAL_ACCOUNT} tokens and{' '}
          {GIFT_BOXES_PER_REFERRAL_ACCOUNT} Gift Boxes for each friend you refer
          that signs up and makes an account.
        </Typography>
        <br />
        <Typography>
          When someone you referred plays a game (with or without an account),
          you will receive a {TOKENS_PER_REFERRAL_PLAY} bonus tokens up to a
          maximum of {MAX_TOKENS_FROM_REFERRAL_PLAYS} tokens from all referrals.
        </Typography>
        <br />
        <Typography>
          <Link href="/help/vip">VIP members</Link> receive more tokens from
          referral plays and have an increased referral limit. They also receive
          larger bonuses for each friend they refer.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: `/account/referrals#${ReferralsPanels.ShareYourLink}`,
              text: `Share your referral link`,
            },
            { href: '/help/tokens', text: 'Learn more about Tokens' },
            { href: '/help/vip', text: 'Learn more about VIP' },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-do-i-refer-a-friend',
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
              href: `/account/referrals#${ReferralsPanels.ShareYourLink}`,
              text: `Share your referral link`,
            },
          ]}
        />
      </Box>
    ),
  },
];
