import { Box, MenuItem, Select, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { Column } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { assertNever } from '@worksheets/util/errors';
import { nth } from '@worksheets/util/numbers';
import {
  durationToString,
  lastSundayUtcMidnight,
  lastUtcMidnight,
  millisecondsAsDuration,
  nextSundayUtcMidnight,
  nextUtcMidnight,
  printDateTime,
} from '@worksheets/util/time';
import {
  LEADERBOARD_FREQUENCY,
  LEADERBOARD_FREQUENCY_LABELS,
  LEADERBOARD_REWARD_PAYOUT,
  LeaderboardFrequency,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import { FC, useState } from 'react';

import { LeaderboardTable } from './leaderboard-table';

export const GameLeaderboards: FC<{
  gameId: string;
}> = ({ gameId }) => {
  const [frequency, setFrequency] = useState<LeaderboardFrequency>('DAILY');
  return (
    <Box mt={2}>
      <Description
        title="Leaderboards"
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

  const leaderboard = trpc.maybe.leaderboards.find.useQuery({
    gameId,
    frequency,
  });

  const participation = trpc.user.leaderboards.participation.useQuery(
    {
      gameId,
      frequency,
    },
    {
      enabled: authenticated,
    }
  );

  if (
    leaderboard.isLoading ||
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
        <Typography color="text.arcade" typography="h6">
          Information
        </Typography>
        <LeaderboardTimestamps frequency={frequency} />
      </Column>
      <Column>
        <Typography color="text.arcade" typography="h6">
          Top Players
        </Typography>
        <Typography color="text.arcade" typography="body2">
          Showing top {leaderboard.data.players.length} players
        </Typography>
        <Typography color="text.arcade" typography="body2" gutterBottom>
          {participation.data?.rank ? (
            <>
              Your rank:{' '}
              <u>
                {participation.data.rank}
                {nth(participation.data.rank)}
              </u>
            </>
          ) : (
            <i>You have not participated in this leaderboard yet</i>
          )}
        </Typography>
        <LeaderboardTable
          frequency={frequency}
          players={leaderboard.data.players}
          participation={participation.data ?? null}
        />
      </Column>

      <Column>
        <Typography color="text.arcade" typography="h6">
          Leaderboard Rewards
        </Typography>
        <LeaderboardPayouts frequency={frequency} />
      </Column>
    </Column>
  );
};

const LeaderboardPayouts: React.FC<{
  frequency: LeaderboardFrequency;
}> = ({ frequency }) => {
  const payouts = LEADERBOARD_REWARD_PAYOUT[frequency];
  if (!payouts.length) {
    return (
      <Typography color="text.arcade" typography="body2">
        No rewards for this leaderboard
      </Typography>
    );
  }
  return (
    <Column gap={0.5}>
      <Typography color="text.arcade" typography="body2">
        Tokens are distributed to the{' '}
        <b>
          Top {payouts.length} {LEADERBOARD_FREQUENCY_LABELS[frequency]}
        </b>{' '}
        players as follows:
      </Typography>
      <Column gap={0.25}>
        {payouts.map((payout, i) => (
          <Typography key={i} color="text.arcade" typography="body2">
            <b>
              {i + 1}
              {nth(i + 1)}
            </b>{' '}
            — {payout} {payout ? pluralize('token', payout) : 'No reward'}
          </Typography>
        ))}
      </Column>
      <Typography color="text.arcade" typography="body2">
        Tie-breakers are determined by the <b>earliest submission</b>.
      </Typography>
    </Column>
  );
};

const LeaderboardTimestamps: React.FC<{
  frequency: LeaderboardFrequency;
}> = ({ frequency }) => {
  const timestamps = getLeaderboardTimestamps(frequency);

  if (timestamps == null)
    return (
      <Typography color="text.arcade" typography="body2">
        Leaderboard never expires
      </Typography>
    );

  return (
    <Column>
      <Typography color="text.arcade" typography="body2">
        Started at: {printDateTime(timestamps.start)}
      </Typography>
      <Typography color="text.arcade" typography="body2">
        Resets at: {printDateTime(timestamps.end)}
      </Typography>
      <Typography color="text.arcade" typography="body2">
        Time remaining:{' '}
        {durationToString(
          millisecondsAsDuration(timestamps.end.getTime() - Date.now())
        )}
      </Typography>
    </Column>
  );
};

const getLeaderboardTimestamps = (frequency: LeaderboardFrequency) => {
  if (frequency === 'DAILY') {
    return {
      start: lastUtcMidnight(),
      end: nextUtcMidnight(),
    };
  }

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
