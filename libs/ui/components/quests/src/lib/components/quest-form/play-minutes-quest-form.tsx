import { OpenInNew } from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column } from '@worksheets/ui/components/flex';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { PlayMinutesQuest } from '@worksheets/util/types';
import pluralize from 'pluralize';

export const PlayMinutesQuestForm: React.FC<{
  quest: PlayMinutesQuest;
}> = ({ quest }) => {
  const minutes = Math.floor(quest.state.duration / 60);
  return (
    <Column gap={2}>
      <BulletPoints
        title={'How It Works'}
        points={[
          <>
            <Link href={routes.library.path()}>Play any game</Link> to qualify
            for this quest.
          </>,
          `You must remain active on the page for at least 1 minute to earn tokens.`,
          <>
            <Link href={routes.vip.path()}>VIP members</Link> earn 2x the
            tokens!
          </>,
        ]}
      />
      <Typography textAlign="center" fontWeight={700} variant="body2">
        You have played for {minutes} {pluralize('minute', minutes)}.
      </Typography>
      <Button
        variant="arcade"
        href={routes.play.path()}
        startIcon={<OpenInNew />}
        target="_blank"
      >
        Play Now!
      </Button>
    </Column>
  );
};