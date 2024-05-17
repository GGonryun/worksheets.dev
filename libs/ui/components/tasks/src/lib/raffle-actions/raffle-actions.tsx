import {
  Alarm,
  FeaturedVideoOutlined,
  LanguageOutlined,
  MouseOutlined,
} from '@mui/icons-material';
import { Box, Button, ButtonProps, Typography } from '@mui/material';
import { TaskType } from '@prisma/client';
import {
  Discord,
  NewTwitter,
  SteamGames,
  Twitch,
} from '@worksheets/icons/companies';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { Tooltip } from '@worksheets/ui/components/tooltips';
import { ActionSchema } from '@worksheets/util/tasks';
import { printDateTime, printTimeRemaining } from '@worksheets/util/time';
import { ReactNode } from 'react';

import { formatTaskFrequencyLabel } from '../util';

export const RaffleActions: React.FC<{
  raffleId: number;
  onClick: (action: ActionSchema) => void;
}> = ({ raffleId, onClick }) => {
  const actions = trpc.user.tasks.actions.list.useQuery({
    raffleId,
  });

  if (actions.isLoading || actions.isRefetching) {
    return <PulsingLogo />;
  }

  if (actions.isError) {
    return <ErrorComponent color="text.blue.darker" />;
  }

  return actions.data.length ? (
    <Column gap={1}>
      <Typography fontWeight={700} typography="h6">
        Enter raffle with actions
      </Typography>

      {actions.data.map((action) => (
        <RaffleAction
          key={action.actionId}
          onClick={() => onClick(action)}
          {...action}
        />
      ))}
    </Column>
  ) : null;
};

const ACTION_COLOR: Record<TaskType, ButtonProps['color']> = {
  [TaskType.FOLLOW_TWITCH]: 'twitch',
  [TaskType.FOLLOW_TWITTER]: 'black',
  [TaskType.JOIN_DISCORD_GUILD]: 'discord',
  [TaskType.WISHLIST_STEAM_GAME]: 'steam',
  [TaskType.VISIT_WEBSITE]: 'warning',
  [TaskType.WATCH_AD]: 'secondary',
  [TaskType.BASIC_ACTION]: 'primary',
  PLAY_GAME: undefined,
  PLAY_MINUTES: undefined,
  REFERRAL_PLAY_MINUTES: undefined,
  FRIEND_PLAY_MINUTES: undefined,
  ADD_FRIEND: undefined,
  ADD_REFERRAL: undefined,
  RAFFLE_PARTICIPATION: undefined,
  BATTLE_PARTICIPATION: undefined,
};

const ACTION_LOGO: Record<TaskType, React.ReactNode> = {
  [TaskType.FOLLOW_TWITCH]: <Twitch />,
  [TaskType.FOLLOW_TWITTER]: <NewTwitter />,
  [TaskType.JOIN_DISCORD_GUILD]: <Discord />,
  [TaskType.WISHLIST_STEAM_GAME]: <SteamGames />,
  [TaskType.VISIT_WEBSITE]: <LanguageOutlined />,
  [TaskType.WATCH_AD]: <FeaturedVideoOutlined />,
  [TaskType.BASIC_ACTION]: <MouseOutlined />,
  PLAY_GAME: undefined,
  PLAY_MINUTES: undefined,
  REFERRAL_PLAY_MINUTES: undefined,
  FRIEND_PLAY_MINUTES: undefined,
  ADD_FRIEND: undefined,
  ADD_REFERRAL: undefined,
  RAFFLE_PARTICIPATION: undefined,
  BATTLE_PARTICIPATION: undefined,
};

const showExpiration = (frequency: string, status: string) =>
  frequency !== 'INFINITE' && frequency !== 'ONCE' && status === 'COMPLETED';

export const ExpiredActionTooltip: React.FC<
  ActionSchema & { children: ReactNode }
> = ({ frequency, expiresAt, reward, children, status }) => {
  return (
    <Tooltip
      title={
        showExpiration(frequency, status) ? (
          <Typography typography={'body2'} fontWeight={400}>
            This entry offers a <b>{formatTaskFrequencyLabel(frequency)}</b>{' '}
            bonus of <b>{reward} tokens</b>. You can complete it again in{' '}
            <b>{printTimeRemaining(expiresAt)}</b> after it resets on{' '}
            <b>{printDateTime(expiresAt)}</b>.
          </Typography>
        ) : null
      }
      followCursor
    >
      <Box component="span" width="100%">
        {children}
      </Box>
    </Tooltip>
  );
};

export const RaffleAction: React.FC<ActionSchema & { onClick: () => void }> = ({
  onClick,
  ...action
}) => {
  const { status, type } = action;
  return (
    <ExpiredActionTooltip {...action}>
      <Box component="span" width="100%">
        <Button
          fullWidth
          disabled={status === 'COMPLETED'}
          variant="arcade"
          color={ACTION_COLOR[type]}
          onClick={onClick}
          startIcon={ACTION_LOGO[type]}
          sx={{
            '&.MuiButton-root': {
              pr: { xs: 1, sm: 2 },
              pl: { xs: 2, sm: 3 },
              display: 'flex',
              justifyContent: 'space-between',
              gap: { xs: 1, sm: 2 },
            },
          }}
        >
          <Label {...action} />
          <Reward {...action} />
        </Button>
      </Box>
    </ExpiredActionTooltip>
  );
};

const Label: React.FC<ActionSchema> = ({
  expiresAt,
  name,
  repetitions,
  maxRepetitions,
  status,
  frequency,
}) => {
  return (
    <Column>
      {showExpiration(frequency, status) && (
        <Row gap={0.5}>
          <SmallAlarmIcon />
          <Typography typography="body3" fontWeight={700}>
            Resets in <b></b>
            {printTimeRemaining(expiresAt)}
          </Typography>
          <SmallAlarmIcon />
        </Row>
      )}
      <Typography
        typography={{ xs: 'body3', sm: 'body2', md: 'body1' }}
        fontWeight={{ xs: 700, sm: 700, md: 700 }}
        sx={{
          textDecoration: status === 'COMPLETED' ? 'line-through' : 'none',
          textDecorationThickness: '2px',
        }}
      >
        {name}
        {maxRepetitions > 1 ? ` (${repetitions}/${maxRepetitions})` : ''}
      </Typography>
    </Column>
  );
};

const SmallAlarmIcon: React.FC = () => (
  <Alarm
    sx={{
      height: (theme) => theme.typography.body2.fontSize,
      width: (theme) => theme.typography.body2.fontSize,
      mt: '-2px',
    }}
  />
);

const Reward: React.FC<ActionSchema> = ({ reward, frequency }) => {
  return (
    <Column
      minHeight={42}
      justifyContent="center"
      alignItems="center"
      textAlign="right"
      minWidth={50}
    >
      <Typography fontWeight={700} lineHeight={1}>
        +{reward}
      </Typography>
      {frequency !== 'INFINITE' && (
        <Typography fontWeight={700} typography={'body3'}>
          {formatTaskFrequencyLabel(frequency)}
        </Typography>
      )}
    </Column>
  );
};
