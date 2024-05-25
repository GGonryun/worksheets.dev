import { HelpOutline, StarBorder } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
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
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';
import { ActionSchema } from '@worksheets/util/tasks';
import { printDateTime, printTimeRemaining } from '@worksheets/util/time';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { RaffleSchema } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import { useState } from 'react';

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
  const session = useSession();
  const handleClose = () => {
    onClose?.({}, 'backdropClick');
    setIndex(-1);
    setUseTokens(false);
  };

  const actions = trpc.user.tasks.actions.list.useQuery(
    {
      raffleId: raffle.id,
    },
    {
      enabled: session.status === 'authenticated',
    }
  );

  const [useTokens, setUseTokens] = useState(false);
  const [index, setIndex] = useState<number>(-1);

  const data = actions.data ?? [];

  return (
    <>
      <RaffleModal
        open={open}
        onClose={handleClose}
        raffle={raffle}
        actions={data}
        onClickAction={setIndex}
        onUseTokens={() => setUseTokens(true)}
      />
      <TokensModal
        raffleId={raffle.id}
        open={useTokens}
        onClose={() => setUseTokens(false)}
      />
      <RaffleActionModal
        raffleId={raffle.id}
        onClose={() => setIndex(-1)}
        action={index >= 0 && data.length > index ? data[index] : undefined}
      />
    </>
  );
};

const RaffleDetailPoint: React.FC<{
  label: string;
  value: string;
  color: PaletteColor;
}> = ({ label, value, color }) => {
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
        color={`${color}.main`}
        typography={{ xs: 'body1', sm: 'h6' }}
        fontWeight={{ xs: 700, sm: 700, md: 700 }}
      >
        {value}
      </Typography>
    </Column>
  );
};

const RaffleModal: React.FC<{
  open: boolean;
  onClose: () => void;
  raffle: RaffleSchema;
  actions: ActionSchema[];
  onClickAction: (index: number) => void;
  onUseTokens: () => void;
}> = ({ actions, open, onClose, raffle, onClickAction, onUseTokens }) => {
  return (
    <ModalLayout open={open} onClose={onClose}>
      <RaffleModalContent
        raffle={raffle}
        actions={actions}
        onClickAction={onClickAction}
        onUseTokens={onUseTokens}
      />
    </ModalLayout>
  );
};

const RaffleModalContent: React.FC<{
  raffle: RaffleSchema;
  actions: ActionSchema[];
  onClickAction: (index: number) => void;
  onUseTokens: () => void;
}> = ({ actions, raffle, onUseTokens, onClickAction }) => {
  const session = useSession();
  const isConnected = session.status === 'authenticated';
  const participation = trpc.user.raffles.participation.useQuery(
    {
      raffleId: raffle.id,
    },
    {
      enabled: isConnected,
    }
  );
  const participants = trpc.maybe.raffles.participants.useQuery({
    raffleId: raffle.id,
  });

  if (
    participation.isLoading ||
    participation.isFetching ||
    participants.isLoading ||
    participants.isFetching
  )
    return <PulsingLogo message="Loading participants..." />;
  if (participation.isError || participants.isError) return <ErrorComponent />;

  return (
    <Column width="100%" gap={2}>
      <Box
        sx={{
          pr: 2,
          display: 'grid',
          [theme.breakpoints.down('mobile1')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            //first two
            '& > *:nth-child(-n + 2)': {
              borderBottom: '1px solid',
              borderColor: 'grey.400',
            },
            '& > *:nth-child(odd)': {
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
        <RaffleDetailPoint
          label="Ends In"
          value={printTimeRemaining(raffle.expiresAt)}
          color="success"
        />
        <RaffleDetailPoint
          label="Entrants"
          value={participants.data.length.toString()}
          color="black"
        />
        <RaffleDetailPoint
          label="Total entries"
          value={participants.data
            .reduce((acc, p) => acc + p.numEntries, 0)
            .toString()}
          color="black"
        />
        <RaffleDetailPoint
          label="Your entries"
          value={participation.data.numEntries.toString()}
          color="black"
        />
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

      <Column gap={1} my={1}>
        <Typography fontWeight={700} typography={'h6'}>
          Enter raffle with tokens
        </Typography>
        <Button
          size="large"
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
          <span>∞</span>
        </Button>
      </Column>
      <RaffleActions
        raffleId={raffle.id}
        actions={actions}
        onClick={onClickAction}
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
  );
};

const TokensModal: React.FC<{
  open: boolean;
  onClose: () => void;
  raffleId: number;
}> = ({ open, onClose, raffleId }) => {
  return (
    <ModalLayout open={open} onClose={onClose}>
      <UseTokensContent raffleId={raffleId} onClose={onClose} />
    </ModalLayout>
  );
};

const UseTokensContent: React.FC<{
  raffleId: number;
  onClose: () => void;
}> = (props) => {
  const [entries, setEntries] = useState(1);
  const [entering, setEntering] = useState(false);

  const snackbar = useSnackbar();
  const utils = trpc.useUtils();

  const enterRaffle = trpc.user.raffles.enterRaffle.useMutation();
  const tokens = trpc.user.inventory.quantity.useQuery('1');

  if (entering) return <PulsingLogo message="Entering raffle..." />;
  if (tokens.isLoading || tokens.isFetching || tokens.isRefetching)
    return <PulsingLogo />;

  if (tokens.isError) return <ErrorComponent />;

  const tooManyEntries = entries > tokens.data / RAFFLE_ENTRY_FEE;

  const handleSetEntries = (value: number) => {
    if (value < 1) {
      setEntries(1);
      return;
    }

    if (value > tokens.data / RAFFLE_ENTRY_FEE) {
      snackbar.error('You do not have enough tokens!');
    }

    setEntries(value);
  };

  const handleEnterRaffle = async () => {
    try {
      setEntering(true);

      await enterRaffle.mutateAsync({
        raffleId: props.raffleId,
        entries,
      });

      utils.user.raffles.participation.refetch();
      utils.user.inventory.quantity.refetch();
      utils.maybe.raffles.participants.refetch({ raffleId: props.raffleId });

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
        <Typography fontWeight={600} variant="h6">
          How many entries would you like to purchase?
        </Typography>
        <Typography
          variant="body2"
          color={tooManyEntries ? 'error.main' : 'text.secondary'}
          fontWeight={500}
        >
          Each raffle entry costs {entries * RAFFLE_ENTRY_FEE} tokens
        </Typography>
      </Column>
      <NumericCounterField value={entries} onChange={handleSetEntries} />
      <Column gap={1}>
        <Button
          startIcon={<StarBorder />}
          fullWidth
          size="medium"
          variant="arcade"
          color="success"
          disabled={entering || tooManyEntries}
          onClick={handleEnterRaffle}
        >
          Purchase {entries} {pluralize('Entry', entries)}
        </Button>
        <Typography
          display={tooManyEntries ? 'block' : 'none'}
          variant="body2"
          color={tooManyEntries ? 'error.main' : 'text.secondary'}
          fontWeight={700}
        >
          {tokens.data < RAFFLE_ENTRY_FEE
            ? `You need at least ${RAFFLE_ENTRY_FEE} tokens to enter the raffle!`
            : `Insufficient Tokens!`}
        </Typography>
      </Column>
    </Column>
  );
};

const RaffleActionModal: React.FC<{
  raffleId: number;
  onClose: () => void;
  action: ActionSchema | undefined;
}> = ({ onClose, action, raffleId }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const trackAction = trpc.user.tasks.actions.track.useMutation();

  const handleSubmit = async (input: { repetitions: number }) => {
    if (!action) return;

    try {
      const reward = await trackAction.mutateAsync({
        actionId: action.actionId,
        repetitions: input.repetitions,
      });
      if (reward) {
        Promise.all([
          utils.user.raffles.participation.refetch(),
          utils.user.tasks.actions.list.refetch({ raffleId }),
        ]);
        snackbar.success(`You received ${reward} free entries!`);
      } else {
        snackbar.success('Action completed!');
      }
      onClose();
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  if (!action) return null;
  return (
    <TaskModal
      onClose={onClose}
      open={Boolean(action)}
      task={action}
      isLoading={trackAction.isLoading}
      actions={{
        onSubmit: handleSubmit,
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
