import { Box, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { HelpReferralsQuestions, SettingsPanels } from '@worksheets/util/enums';
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
          Referrals are a way to invite your friends to join the community. Some
          contests and promotions may require you to refer a friend to
          participate. When you refer a friend.
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
