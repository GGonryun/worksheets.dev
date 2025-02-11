import { Button, Link, Typography } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { ReferralsPanels } from '@worksheets/util/enums';
import { TaskFormProps } from '@worksheets/util/tasks';
import pluralize from 'pluralize';
import React from 'react';

export const AddReferralForm: React.FC<TaskFormProps> = ({ task }) => {
  const referrals = task.repetitions;
  return (
    <Column gap={1}>
      <BulletPoints
        title={'How It Works'}
        points={[
          `Share your referral link with other players.`,
          `Every time someone signs up with your referral link, you'll earn extra tokens.`,
          <>
            <Link href={playRoutes.help.vip.path()}>VIP Members</Link> earn x2
            tokens for each referral added.
          </>,
        ]}
      />
      <Typography textAlign="center" fontWeight={500} mt={2}>
        You have added {referrals} {pluralize('referrals', referrals)}.
      </Typography>
      <Button
        variant="arcade"
        size="small"
        color="warning"
        href={playRoutes.account.referrals.path({
          bookmark: ReferralsPanels.ShareYourLink,
        })}
      >
        Share Your Link
      </Button>
    </Column>
  );
};
