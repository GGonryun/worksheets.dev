import { AccessTime, EmojiEvents, Leaderboard } from '@mui/icons-material';
import {
  Box,
  MenuItem,
  Select,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { Column } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { assertNever } from '@worksheets/util/errors';
import { nth } from '@worksheets/util/numbers';
import {
  durationToString,
  lastSundayUtcMidnight,
  millisecondsAsDuration,
  nextSundayUtcMidnight,
  printDateTime,
} from '@worksheets/util/time';
import { NO_REFETCH } from '@worksheets/util/trpc';
import {
  LEADERBOARD_FREQUENCY,
  LEADERBOARD_FREQUENCY_LABELS,
  LeaderboardFrequency,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import React, { FC, useState } from 'react';

import { LeaderboardTable } from './leaderboard-table';

export const GameLeaderboards: FC<{
  gameId: string;
}> = ({ gameId }) => {
  const [frequency, setFrequency] = useState<LeaderboardFrequency>('WEEKLY');
  return (
    <Box mt={2}>
      <Description
        title="Leaderboard"
        description={<Content gameId={gameId} frequency={frequency} />}
        ancillary={
          <SelectFrequency current={frequency} onChange={setFrequency} />
        }
      />
    </Box>
  );
};

const SelectFrequency: FC<{
  current: LeaderboardFrequency;
  onChange: (frequency: LeaderboardFrequency) => void;
}> = ({ current, onChange }) => {
  return (
    <Select
      size="small"
      value={current}
      onChange={(e) => {
        onChange(e.target.value as LeaderboardFrequency);
      }}
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      {Object.keys(LEADERBOARD_FREQUENCY).map((frequency) => (
        <MenuItem key={frequency} value={frequency}>
          {LEADERBOARD_FREQUENCY_LABELS[frequency as LeaderboardFrequency]}
        </MenuItem>
      ))}
    </Select>
  );
};

const Content: React.FC<{
  gameId: string;
  frequency: LeaderboardFrequency;
}> = ({ gameId, frequency }) => {
  const session = useSession();
  const authenticated = session.status === 'authenticated';

  const leaderboard = trpc.maybe.leaderboards.find.useQuery(
    {
      gameId,
      frequency,
    },
    NO_REFETCH
  );

  const participation = trpc.user.leaderboards.participation.useQuery(
    {
      gameId,
      frequency,
    },
    {
      enabled: authenticated,
      ...NO_REFETCH,
    }
  );

  if (
    leaderboard.isPending ||
    participation.isFetching ||
    participation.isRefetching
  ) {
    return <LoadingBar />;
  }

  if (leaderboard.isError || participation.isError) {
    return (
      <Typography color="text.arcade">
        Failed to load leaderboard, refresh the page or contact support if the
        error persists.
      </Typography>
    );
  }

  return (
    <Column gap={3}>
      <Column>
        <LeaderboardTable
          players={leaderboard.data?.players ?? []}
          participation={participation.data ?? null}
        />
      </Column>
      <Column mt={-1} gap={0.5} sx={{ width: 'fit-content' }}>
        <TotalPlayers total={leaderboard.data?.players.length} />
        <PlayerPosition rank={participation.data?.rank} />
        <LeaderboardTimestamps frequency={frequency} />
      </Column>
    </Column>
  );
};

const DetailText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.arcade,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const TotalPlayers: React.FC<{ total?: number }> = ({ total }) => {
  return (
    <DetailText>
      <Leaderboard fontSize="small" />{' '}
      {`${total} ${pluralize('participant', total)}`}
    </DetailText>
  );
};

const PlayerPosition: React.FC<{
  rank?: number;
}> = ({ rank }) => {
  return (
    <DetailText>
      {rank ? (
        <>
          <EmojiEvents fontSize="small" />
          <span>
            {rank}
            {nth(rank)} place
          </span>
        </>
      ) : (
        <span>You have not participated in this leaderboard yet</span>
      )}
    </DetailText>
  );
};

const LeaderboardTimestamps: React.FC<{
  frequency: LeaderboardFrequency;
}> = ({ frequency }) => {
  const timestamps = getLeaderboardTimestamps(frequency);

  if (timestamps == null)
    return <DetailText>Leaderboard never expires</DetailText>;

  return (
    <Tooltip
      title={`Leaderboard resets ${printDateTime(timestamps.end)}`}
      arrow
    >
      <DetailText
        color="text.arcade"
        typography="body2"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <AccessTime fontSize="small" />
        {durationToString(
          millisecondsAsDuration(timestamps.end.getTime() - Date.now())
        )}
      </DetailText>
    </Tooltip>
  );
};

const getLeaderboardTimestamps = (frequency: LeaderboardFrequency) => {
  if (frequency === 'WEEKLY') {
    return {
      start: lastSundayUtcMidnight(),
      end: nextSundayUtcMidnight(),
    };
  }

  if (frequency === 'ALL_TIME') {
    return undefined;
  }

  throw assertNever(frequency);
};
