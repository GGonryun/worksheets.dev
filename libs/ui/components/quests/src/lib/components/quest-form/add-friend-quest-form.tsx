import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { DetailedQuestSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';
import React from 'react';

export const AddFriendQuestForm: React.FC<{
  quest: DetailedQuestSchema<'ADD_FRIEND'>;
}> = ({ quest }) => {
  return (
    <Column gap={1}>
      <BulletPoints
        title={'How It Works'}
        points={[
          `Go to your account and add friends using their friend code.`,
          `They don't need to add you back for you to complete this quest.`,
          <>
            <Link href={routes.help.vip.path()}>VIP Members</Link> earn x2
            tokens for each friend added.
          </>,
        ]}
      />
      <Typography textAlign="center" fontWeight={500} mt={2}>
        You have added {quest.state.friends.length}{' '}
        {pluralize('friend', quest.state.friends.length)}.
      </Typography>
      <Button
        variant="arcade"
        size="small"
        color="secondary"
        href={routes.account.friends.path()}
      >
        Add Friends
      </Button>
    </Column>
  );
};
