import { HelpOutline, OpenInNew, StarBorder } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { FillImage } from '@worksheets/ui/components/images';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import {
  InfoModal,
  ModalProps,
  ModalWrapper,
} from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { RaffleActions, TaskModal } from '@worksheets/ui/components/tasks';
import theme, { PaletteColor } from '@worksheets/ui/theme';
import { fireAndForget } from '@worksheets/util/promises';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';
import { ActionSchema, TaskInputSchema } from '@worksheets/util/tasks';
import { printDateTime, printTimeRemaining } from '@worksheets/util/time';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { RaffleSchema } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import React, { useEffect, useState } from 'react';

const ModalLayout: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <InfoModal open={open} onClose={onClose}>
      <Box>{children}</Box>
    </InfoModal>
  );
};

export const EnterRaffleModal: React.FC<
  ModalWrapper<{
    raffle: RaffleSchema;
  }>
> = ({ raffle, open, onClose }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const session = useSession();
  const actions = trpc.user.tasks.actions.list.useQuery(
    {
      raffleId: raffle.id,
    },
    {
      enabled: session.status === 'authenticated',
    }
  );

  const trackAction = trpc.user.tasks.actions.track.useMutation();
  const handleClose = () => {
    onClose?.({}, 'backdropClick');
    setActionId(undefined);
    setUseTokens(false);
  };

  const [useTokens, setUseTokens] = useState(false);
  const [actionId, setActionId] = useState<string | undefined>(undefined);
  const [dirty, setDirty] = useState<string[]>([]);

  useEffect(() => {
    if (!actions.isRefetching) {
      setDirty([]);
    }
  }, [actions.isRefetching]);

  const refreshActions = async (id: string) => {
    setDirty((prev) => [...prev, id]);
    await utils.user.tasks.actions.list.refetch({ raffleId: raffle.id });
  };

  const handleSubmit = async (input: TaskInputSchema) => {
    if (!actionId) return;

    try {
      const reward = await trackAction.mutateAsync({
        actionId,
        ...input,
      });

      if (reward) {
        fireAndForget(
          Promise.all([
            refreshActions(actionId),
            utils.user.raffles.participation.refetch(),
            utils.maybe.raffles.participants.refetch({ raffleId: raffle.id }),
          ])
        );
        snackbar.success(`You received ${reward} free entries!`);
      } else {
        snackbar.success('Action completed!');
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setActionId(undefined);
    }
  };

  const data = actions.data ?? [];

  return (
    <>
      <RaffleModal
        open={open}
        onClose={handleClose}
        raffle={raffle}
        dirty={dirty}
        actions={data}
        onClickAction={setActionId}
        onUseTokens={() => setUseTokens(true)}
      />
      <TokensModal
        raffle={raffle}
        open={useTokens}
        onClose={() => setUseTokens(false)}
      />
      <RaffleActionModal
        isLoading={trackAction.isLoading}
        onSubmit={handleSubmit}
        onClose={() => setActionId(undefined)}
        action={data?.find((a) => a.actionId === actionId)}
      />
    </>
  );
};

const RaffleDetailPoint: React.FC<{
  label: string;
  children: React.ReactNode;
  color: PaletteColor;
}> = ({ label, children, color }) => {
  return (
    <Column textAlign="center" justifyContent="flex-end" p={1}>
      <Typography
        color="text.secondary"
        typography={{ xs: 'body3', sm: 'body2' }}
        fontWeight={{ xs: 700, sm: 700, md: 700 }}
      >
        {label}
      </Typography>
      <Typography
        component="span"
        color={`${color}.main`}
        typography={{ xs: 'body1', sm: 'h6' }}
        fontWeight={{ xs: 700, sm: 700, md: 700 }}
      >
        {children}
      </Typography>
    </Column>
  );
};

const RaffleModal: React.FC<{
  open: boolean;
  onClose: () => void;
  raffle: RaffleSchema;
  actions: ActionSchema[];
  dirty: string[];
  onClickAction: (actionId: string) => void;
  onUseTokens: () => void;
}> = ({
  dirty,
  actions,
  open,
  onClose,
  raffle,
  onClickAction,
  onUseTokens,
}) => {
  const participation = useYourEntries(raffle.id);
  const purchased = participation.data?.purchased ?? 0;
  return (
    <ModalLayout open={open} onClose={onClose}>
      <Column width="100%" gap={2}>
        <Box
          sx={{
            pr: 2,
            display: 'grid',
            [theme.breakpoints.down('mobile1')]: {
              gridTemplateColumns: 'repeat(2, 1fr)',
              '& > *:nth-of-type(-n + 2)': {
                borderBottom: '1px solid',
                borderColor: 'grey.400',
              },
              '& > *:nth-of-type(odd)': {
                borderRight: '1px solid',
                borderColor: 'grey.400',
              },
            },
            [theme.breakpoints.up('mobile1')]: {
              gridTemplateColumns: 'repeat(4, 1fr)',
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'grey.400',
              },
            },
          }}
        >
          <RaffleDetailPoint label="Ends In" color="success">
            {printTimeRemaining(raffle.expiresAt)}
          </RaffleDetailPoint>
          <RaffleDetailPoint label="Entrants" color="black">
            <RaffleEntrants raffleId={raffle.id} />
          </RaffleDetailPoint>
          <RaffleDetailPoint label="Total entries" color="black">
            <RaffleTotalEntries raffleId={raffle.id} />
          </RaffleDetailPoint>
          <RaffleDetailPoint label="Your entries" color="black">
            <RaffleYourEntries raffleId={raffle.id} />
          </RaffleDetailPoint>
        </Box>
        <Box
          position="relative"
          sx={{
            width: '100%',
            height: '100%',
            aspectRatio: '16/9',
          }}
        >
          <FillImage src={raffle.imageUrl} alt={raffle.name} />
        </Box>
        <Row sx={{ mt: -8 }} alignItems="flex-end" gap={2}>
          <Box
            sx={{
              ml: 2,
              backgroundColor: '#FFFFFF',
              position: 'relative',
              height: 100,
              width: 100,
              borderRadius: (theme) => theme.shape.borderRadius,
              border: '2px solid grey',
              overflow: 'hidden',
            }}
          >
            <FillImage src={raffle.sponsor.logo} alt={raffle.sponsor.name} />
          </Box>
          <Typography mb={1.5}>
            by <Link href={raffle.sponsor.url}>{raffle.sponsor.name}</Link>
          </Typography>
        </Row>
        <Column gap={0.5}>
          <Typography typography={'h4'}>{raffle.name}</Typography>
          <Typography typography={'body1'} gutterBottom>
            {raffle.description}
          </Typography>
          <Typography
            color="text.secondary"
            typography={{ xs: 'body3', sm: 'body2', md: 'body1' }}
          >
            <b>Launched At:</b> {printDateTime(raffle.createdAt)}
          </Typography>
          <Typography
            color="text.secondary"
            typography={{ xs: 'body3', sm: 'body2', md: 'body1' }}
          >
            <b>Expires At:</b> {printDateTime(raffle.expiresAt)}
          </Typography>
        </Column>
        {(raffle.maxEntries == null || raffle.maxEntries > 1) && (
          <Column gap={1} my={1}>
            <Typography fontWeight={700} typography={'h6'}>
              Enter raffle with tokens
            </Typography>
            <Button
              size="large"
              disabled={
                raffle.maxEntries != null && purchased === raffle.maxEntries
              }
              startIcon={<StarBorder />}
              onClick={onUseTokens}
              variant="arcade"
              color="success"
              sx={{
                '&.MuiButton-root': {
                  minHeight: 50,
                  display: 'flex',
                  justifyContent: 'space-between',
                },
              }}
            >
              <span>Spend Tokens</span>
              <span>
                {raffle.maxEntries != null
                  ? `(${purchased ?? '...'}/${raffle.maxEntries})`
                  : '∞'}
              </span>
            </Button>
          </Column>
        )}
        <RaffleActions
          raffleId={raffle.id}
          actions={actions}
          onClick={onClickAction}
          dirty={dirty}
        />
        <Button
          variant="text"
          href={routes.help.prizes.path()}
          target="_blank"
          startIcon={<HelpOutline />}
          sx={{
            mb: 2,
            alignSelf: 'flex-end',
          }}
        >
          Help Center
        </Button>
      </Column>
    </ModalLayout>
  );
};

const RaffleEntrants: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const participants = trpc.maybe.raffles.participants.useQuery({
    raffleId,
  });

  if (participants.isLoading || participants.isRefetching)
    return <PulsingLogo hideMessage size={22} />;

  return (
    <span>
      {participants.isError ? 'N/A' : participants.data.length.toString()}
    </span>
  );
};

const RaffleTotalEntries: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const participants = trpc.maybe.raffles.participants.useQuery({
    raffleId,
  });

  if (participants.isLoading || participants.isRefetching)
    return <PulsingLogo hideMessage size={22} />;

  return (
    <span>
      {participants.isError
        ? 'N/A'
        : participants.data
            .reduce((acc, p) => acc + p.numEntries, 0)
            .toString()}
    </span>
  );
};

const RaffleYourEntries: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const participation = useYourEntries(raffleId);

  if (participation.isLoading || participation.isRefetching)
    return <PulsingLogo hideMessage size={22} />;
  return (
    <span>
      {participation.isError ? 'N/A' : participation.data.numEntries.toString()}
    </span>
  );
};

const useYourEntries = (raffleId: number) => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';
  const participation = trpc.user.raffles.participation.useQuery(
    {
      raffleId,
    },
    {
      enabled: isConnected,
    }
  );
  return participation;
};

const TokensModal: React.FC<{
  open: boolean;
  onClose: () => void;
  raffle: RaffleSchema;
}> = ({ open, onClose, raffle }) => {
  return (
    <ModalLayout open={open} onClose={onClose}>
      <UseTokensContent raffle={raffle} onClose={onClose} />
    </ModalLayout>
  );
};

const UseTokensContent: React.FC<{
  raffle: RaffleSchema;
  onClose: () => void;
}> = (props) => {
  const [entries, setEntries] = useState(1);
  const [entering, setEntering] = useState(false);

  const snackbar = useSnackbar();
  const utils = trpc.useUtils();

  const participation = useYourEntries(props.raffle.id);
  const enterRaffle = trpc.user.raffles.enterRaffle.useMutation();
  const tokens = trpc.user.inventory.quantity.useQuery('1');

  if (entering) return <PulsingLogo message="Entering raffle..." />;
  if (tokens.isLoading || tokens.isFetching || tokens.isRefetching)
    return <PulsingLogo />;

  if (tokens.isError) return <ErrorComponent />;

  const cannotAfford = entries > tokens.data / RAFFLE_ENTRY_FEE;
  const purchased = participation.data?.purchased ?? 0;
  const availableEntries = props.raffle.maxEntries
    ? props.raffle.maxEntries - purchased
    : Infinity;
  const tooManyEntries = entries > availableEntries;

  const handleSetEntries = (value: number) => {
    if (value < 1) {
      setEntries(1);
      return;
    }

    if (value > tokens.data / RAFFLE_ENTRY_FEE) {
      snackbar.error('You do not have enough tokens!');
    }

    if (value > availableEntries) {
      snackbar.error('Too many entries!');
    }

    setEntries(value);
  };

  const handleEnterRaffle = async () => {
    try {
      setEntering(true);

      await enterRaffle.mutateAsync({
        raffleId: props.raffle.id,
        entries,
      });

      utils.user.raffles.participation.refetch();
      utils.user.inventory.quantity.refetch();
      utils.maybe.raffles.participants.refetch({ raffleId: props.raffle.id });

      snackbar.success('You entered the raffle! Good luck!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      props.onClose();
      setEntering(false);
    }
  };

  return (
    <Column gap={2}>
      <Column>
        <Typography fontWeight={600} variant="h6" gutterBottom>
          How many entries would you like to purchase?
        </Typography>

        <Typography>
          You have{' '}
          <u>
            <b>{tokens.data} tokens</b>
          </u>{' '}
          available to spend.
        </Typography>

        {props.raffle.maxEntries != null && (
          <Typography>
            You can purchase up to{' '}
            <u>
              <b>
                {availableEntries} {pluralize('entry', availableEntries)}
              </b>
            </u>{' '}
            for this raffle.
          </Typography>
        )}
      </Column>
      <Divider />
      <Typography variant="body2" color="text.secondary" textAlign="center">
        <b>
          {entries} {pluralize('entry', entries)}
        </b>{' '}
        will cost you <b>{entries * RAFFLE_ENTRY_FEE} tokens</b>.
      </Typography>
      <NumericCounterField value={entries} onChange={handleSetEntries} />

      <Column gap={1}>
        <Button
          startIcon={<StarBorder />}
          fullWidth
          size="medium"
          variant="arcade"
          color="success"
          disabled={entering || cannotAfford || tooManyEntries}
          onClick={handleEnterRaffle}
        >
          Purchase {entries} {pluralize('Entry', entries)}
        </Button>
        <Typography
          display={cannotAfford || tooManyEntries ? 'block' : 'none'}
          variant="body2"
          color={
            cannotAfford || tooManyEntries ? 'error.main' : 'text.secondary'
          }
          fontWeight={700}
        >
          {tokens.data < RAFFLE_ENTRY_FEE
            ? `You need at least ${RAFFLE_ENTRY_FEE} tokens to enter the raffle!`
            : tooManyEntries
            ? `You can only purchase ${availableEntries} ${pluralize(
                'entry',
                availableEntries
              )}!`
            : `You do not have enough tokens!`}
        </Typography>
      </Column>
      <Box alignSelf="flex-end">
        <Button
          variant="text"
          href={routes.account.quests.path()}
          target="_blank"
          startIcon={<OpenInNew />}
          sx={{ width: 200 }}
        >
          Earn more tokens
        </Button>
      </Box>
    </Column>
  );
};

const RaffleActionModal: React.FC<{
  onClose: () => void;
  onSubmit: (input: TaskInputSchema) => void;
  action?: ActionSchema;
  isLoading: boolean;
}> = ({ onClose, action, isLoading, onSubmit }) => {
  if (!action) return null;

  return (
    <TaskModal
      onClose={onClose}
      open={Boolean(action)}
      isLoading={isLoading}
      task={action}
      actions={{
        onSubmit: onSubmit,
        onCancel: onClose,
      }}
      rewards={
        <Typography px={1} py={2} typography={'h6'}>
          +{action.reward} Bonus Raffle Entries
        </Typography>
      }
    />
  );
};
