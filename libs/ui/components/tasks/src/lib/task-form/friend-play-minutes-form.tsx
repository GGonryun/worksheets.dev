import { OpenInNew } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { MAX_BEST_FRIENDS } from '@worksheets/util/settings';
import { TaskFormProps } from '@worksheets/util/tasks';
import pluralize from 'pluralize';

const ADD_FRIENDS_LINK = routes.account.path({});
const FRIENDS_LIST_LINK = routes.account.path({});

export const FriendPlayMinutesForm: React.FC<TaskFormProps> = ({ task }) => {
  const minutes = Math.floor(task.repetitions / 60);

  return (
    <Column gap={2}>
      <BulletPoints
        title={'How It Works'}
        points={[
          <>
            <Link href={FRIENDS_LIST_LINK}>Add friends</Link> and select them as
            a best friend.
          </>,
          `You can select up to ${MAX_BEST_FRIENDS} best friends.`,
          `Any time you play a game, your best friends will earn tokens.`,
          `You must remain active on the page for at least 1 minute to contribute towards this quest.`,
          <>
            <Link href={routes.vip.path()}>VIP members</Link> earn 2x the
            tokens!
          </>,
        ]}
      />
      <Typography fontWeight={700} variant="body2" textAlign="center">
        Your best friends have played {minutes} {pluralize('minute', minutes)}.
      </Typography>
      <Button
        variant="arcade"
        href={ADD_FRIENDS_LINK}
        startIcon={<OpenInNew />}
        target="_blank"
      >
        Add Friends
      </Button>
    </Column>
  );
};
