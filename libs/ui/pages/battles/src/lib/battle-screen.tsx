import {
  ArrowLeft,
  ExpandLess,
  ExpandMore,
  OpenInNew,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Container,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { BattleStatus, MvpReason } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { ItemModal } from '@worksheets/ui/components/monsters';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import { NO_REFETCH } from '@worksheets/util/trpc';
import {
  BattleLogSchema,
  BattleParticipationSchema,
  BattleRecordSchema,
  BattleSchema,
  MobLootSchema,
  MVP_REASON_LABEL,
} from '@worksheets/util/types';
import { compact } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

import { BossBattle } from './boss-battle';

export const DynamicBattleScreen = dynamic(
  () => Promise.resolve(BattleScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

const BattleScreen = () => {
  const { query } = useRouter();
  const battleId = Number(query.battleId);

  const queryOpts = {
    enabled: !!battleId,
    ...NO_REFETCH,
  };
  const battle = trpc.maybe.battles.find.useQuery(battleId, queryOpts);
  const participation = trpc.maybe.battles.participation.useQuery(
    battleId,
    queryOpts
  );
  const battleLogs = trpc.maybe.battles.logs.useQuery(battleId, queryOpts);
  const battleRecord = trpc.maybe.battles.record.useQuery(battleId, queryOpts);

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Button
        variant="arcade"
        size="small"
        color="error"
        href={routes.battles.path()}
        startIcon={<ArrowLeft />}
        sx={{ mb: 3 }}
      >
        All Battles
      </Button>
      <Paper
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: 2,
        }}
      >
        <BattleDetails
          battle={battle.data}
          isLoading={battle.isLoading}
          isError={battle.isError}
        />
      </Paper>
      <br />
      <Description
        title={'Battle Participation'}
        description={
          <ParticipationContent
            battle={battle.data}
            record={battleRecord.data ?? null}
            participation={participation.data}
            isLoading={
              participation.isLoading ||
              battle.isLoading ||
              battleRecord.isLoading
            }
            isError={
              participation.isError || battle.isError || battleRecord.isError
            }
          />
        }
        color="secondary"
      />
      <br />
      <Description
        title={'Battle Logs'}
        description={<BattleLogsContent battleLogs={battleLogs.data} />}
        color="secondary"
      />
    </Container>
  );
};

const BattleLogsContent: React.FC<{ battleLogs?: BattleLogSchema[] }> = ({
  battleLogs,
}) => {
  if (!battleLogs) {
    return <LoadingBar />;
  }
  if (!battleLogs.length) {
    return (
      <Column gap={1.5}>
        <Typography variant="body1" fontWeight={600}>
          No logs exist for this battle
        </Typography>
        <Button
          variant="text"
          color="primary"
          startIcon={<OpenInNew />}
          target="_blank"
          sx={{ width: 'fit-content' }}
          href={routes.help.mobs.path()}
        >
          Learn about monsters
        </Button>
      </Column>
    );
  }
  return <BattleLogTable logs={battleLogs} />;
};

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const BattleLogTable: React.FC<{
  logs: BattleLogSchema[];
}> = ({ logs }) => {
  return (
    <TableContainer component={StyledBox}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{log.message}</TableCell>
              <TableCell align="right">
                {printShortDateTime(log.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BattleDetails: React.FC<{
  battle?: BattleSchema;
  isLoading: boolean;
  isError: boolean;
}> = ({ battle, isLoading, isError }) => {
  if (!battle || isLoading) return <LoadingBar />;
  if (isError) return <ErrorComponent />;

  if (
    battle.status === BattleStatus.PENDING ||
    battle.status === BattleStatus.CANCELLED
  ) {
    return (
      <Column gap={2}>
        <BattleTitle {...battle} />
        <Typography variant="h6">Battle is not active</Typography>
      </Column>
    );
  }

  return (
    <Column gap={2}>
      <BattleTitle {...battle} />
      <BossBattle
        battle={battle}
        href={routes.monster.path({
          params: {
            monsterId: battle.mob.id,
          },
        })}
      />
    </Column>
  );
};

const BattleTitle: React.FC<BattleSchema> = (boss) => {
  return (
    <GradientShadowedTypography
      typography={{ xs: 'h5', sm: 'h4', md: 'h4' }}
      textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
    >
      Boss Battle #{boss.id}
    </GradientShadowedTypography>
  );
};

const InProgressParticipationContent: React.FC<{
  battle: BattleSchema;
  participation: BattleParticipationSchema[];
}> = ({ battle, participation }) => {
  return (
    <Column>
      <Typography variant="h6"> Participants</Typography>
      {participation.length ? (
        <>
          {participation.map((participant, index) => (
            <ParticipationItem
              key={participant.id}
              index={index + 1}
              battle={battle}
              participation={participant}
            />
          ))}
        </>
      ) : (
        <Typography>No participants yet</Typography>
      )}
    </Column>
  );
};

const ParticipationContent: React.FC<{
  battle?: BattleSchema;
  participation?: BattleParticipationSchema[];
  isLoading: boolean;
  isError: boolean;
  record: BattleRecordSchema | null;
}> = ({ battle, participation, record, isError, isLoading }) => {
  if (isLoading || !participation || !battle) return <LoadingBar />;
  if (isError) return <ErrorComponent />;

  const mvp = participation.filter((p) => p.id === record?.mvpId)?.at(0);
  const winners = participation.filter(
    (p) => !!record?.results[p.id] && !(mvp?.id === p.id)
  );
  const losers = participation.filter(
    (p) => !winners.some((w) => w.id === p.id) && !(mvp?.id === p.id)
  );

  if (battle.status === BattleStatus.ACTIVE) {
    return (
      <InProgressParticipationContent
        battle={battle}
        participation={participation}
      />
    );
  }

  return (
    <Column gap={3}>
      {mvp && (
        <Column>
          <Typography variant="h6" gutterBottom>
            MVP
          </Typography>
          <ParticipationItem
            key={mvp.id}
            index={1}
            items={record?.results[mvp.id] ?? {}}
            battle={battle}
            participation={mvp}
            mvpReason={record?.mvpReason}
          />
        </Column>
      )}
      {Boolean(winners.length) && (
        <Column>
          <Typography variant="h6" gutterBottom>
            Loot Winners
          </Typography>
          <Column gap={1}>
            {winners.map((participation, index) => (
              <ParticipationItem
                key={participation.id}
                index={index + 1}
                items={record?.results[participation.id] ?? {}}
                battle={battle}
                participation={participation}
              />
            ))}
          </Column>
        </Column>
      )}
      {Boolean(losers.length) && (
        <Column>
          <Typography variant="h6" gutterBottom>
            Other Participants
          </Typography>
          <Column gap={1}>
            {losers.map((participation, index) => (
              <ParticipationItem
                key={participation.id}
                index={index + 1}
                battle={battle}
                items={record?.results[participation.id]}
                participation={participation}
              />
            ))}
          </Column>
        </Column>
      )}
    </Column>
  );
};

const ParticipationItem: React.FC<{
  participation: BattleParticipationSchema;
  battle: BattleSchema;
  items?: Record<string, number>;
  index: number;
  mvpReason?: MvpReason;
}> = ({ participation, battle, index, mvpReason, items = {} }) => {
  const [open, setOpen] = React.useState(false);

  const loot = compact(
    Object.keys(items).map((itemId) => {
      const l = battle.mob.loot.find((l) => l.item.id === itemId);
      if (!l) {
        return undefined;
      } else {
        return {
          ...l,
          quantity: items[itemId],
        };
      }
    })
  );

  return (
    <Box width="100%">
      <Row gap={1} width="100%" alignItems="flex-st">
        {Boolean(Object.keys(items).length) && (
          <Button
            variant="arcade"
            size="small"
            onClick={() => setOpen((o) => !o)}
            startIcon={
              open ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )
            }
            sx={{
              minWidth: '100px',
              maxWidth: '100px',
              width: '100px',
            }}
          >
            Loot
          </Button>
        )}
        <Typography fontWeight={500}>
          {index}.{' '}
          <Link
            href={routes.user.path({
              params: {
                userId: participation.user.id,
              },
            })}
          >
            {participation.user.username}
          </Link>{' '}
          - {participation.damage.toFixed(2)} damage
          {mvpReason && ` - MVP: ${MVP_REASON_LABEL[mvpReason]}`}
        </Typography>
      </Row>
      <Collapse in={open}>
        <Box mt={1} mb={2} display="flex" gap={1} flexWrap={'wrap'}>
          {loot.map((loot, i) => (
            <ParticipationItemPair key={i} loot={loot} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

const ParticipationItemPair: React.FC<{
  loot: MobLootSchema;
}> = ({ loot }) => {
  const [show, setShow] = React.useState(false);
  return (
    <Fragment>
      <Typography
        display="inline-flex"
        component={Link}
        fontWeight={500}
        color="primary.main"
        underline="hover"
        onClick={() => setShow(true)}
        sx={{
          cursor: 'pointer',
        }}
      >
        {loot.mvp ? '🏆' : '⭐️'} {loot.quantity}x {loot.item.name}
      </Typography>
      <ItemModal open={show} onClose={() => setShow(false)} loot={loot} />
    </Fragment>
  );
};
