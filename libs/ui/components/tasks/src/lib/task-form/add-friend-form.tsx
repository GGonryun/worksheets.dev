import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { TaskFormProps } from '@worksheets/util/tasks';
import pluralize from 'pluralize';
import React from 'react';

export const AddFriendForm: React.FC<TaskFormProps> = ({ task }) => {
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
        You have added {task.repetitions}{' '}
        {pluralize('friend', task.repetitions)}.
      </Typography>
      <Button
        variant="arcade"
        size="small"
        color="secondary"
        href={routes.account.path()}
      >
        Add Friends
      </Button>
    </Column>
  );
};
