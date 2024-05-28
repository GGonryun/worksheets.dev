import { Alarm } from '@mui/icons-material';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { MAX_INT } from '@worksheets/prisma';
import { Column, Row } from '@worksheets/ui/components/flex';
import { Tooltip } from '@worksheets/ui/components/tooltips';
import { ActionSchema } from '@worksheets/util/tasks';
import { printDateTime, printTimeRemaining } from '@worksheets/util/time';
import { ReactNode } from 'react';

import {
  formatMaxRepetitions,
  formatTaskFrequencyLabel,
  selectTaskBackgroundColor,
  selectTaskStatusIcon,
} from '../util';

export const RaffleActions: React.FC<{
  raffleId: number;
  actions: ActionSchema[];
  dirty: string[];
  onClick: (actionId: string) => void;
}> = ({ dirty, actions, onClick }) => {
  return actions.length ? (
    <Column gap={1}>
      <Typography fontWeight={700} typography="h6">
        Enter raffle with actions
      </Typography>

      {actions.map((action) => (
        <RaffleAction
          key={action.actionId}
          dirty={dirty.includes(action.actionId)}
          onClick={() => onClick(action.actionId)}
          {...action}
        />
      ))}
    </Column>
  ) : null;
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

export const RaffleAction: React.FC<
  ActionSchema & { dirty: boolean; onClick: () => void }
> = ({ onClick, dirty, ...action }) => {
  const { status, type } = action;
  const Icon = selectTaskStatusIcon(status, type);
  return (
    <ExpiredActionTooltip {...action}>
      <Box component="span" width="100%">
        <Button
          disabled={dirty}
          fullWidth
          variant="arcade"
          color={selectTaskBackgroundColor(status, type)}
          onClick={onClick}
          startIcon={dirty ? <CircularProgress size={16} /> : <Icon />}
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
          {dirty ? 'Loading...' : <Label {...action} />}
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
        {maxRepetitions > 1 && maxRepetitions < MAX_INT
          ? ` (${repetitions}/${formatMaxRepetitions(maxRepetitions)})`
          : ''}
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
