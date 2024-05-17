import { StarBorder } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import {
  InfoModal,
  ModalProps,
  ModalWrapper,
} from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { RaffleActions, TaskModal } from '@worksheets/ui/components/tasks';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';
import { ActionSchema } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
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
    raffleId: number;
  }>
> = ({ raffleId, open, onClose }) => {
  const handleClose = () => {
    onClose?.({}, 'backdropClick');
    setAction(undefined);
    setUseTokens(false);
  };

  const [useTokens, setUseTokens] = useState(false);
  const [action, setAction] = useState<ActionSchema | undefined>(undefined);

  return (
    <>
      <RaffleModal
        open={open}
        onClose={handleClose}
        raffleId={raffleId}
        onClickAction={setAction}
        onUseTokens={() => setUseTokens(true)}
      />
      <TokensModal
        raffleId={raffleId}
        open={useTokens}
        onClose={() => setUseTokens(false)}
      />
      <RaffleActionModal
        raffleId={raffleId}
        onClose={() => setAction(undefined)}
        action={action}
      />
    </>
  );
};

const RaffleModal: React.FC<{
  open: boolean;
  onClose: () => void;
  raffleId: number;
  onClickAction: (action: ActionSchema) => void;
  onUseTokens: () => void;
}> = ({ open, onClose, raffleId, onClickAction, onUseTokens }) => {
  return (
    <ModalLayout open={open} onClose={onClose}>
      <Column width="100%" gap={2}>
        <Typography
          typography={{ xs: 'h5', sm: 'h4' }}
          color={'primary.main'}
          gutterBottom
        >
          Enter Raffle
        </Typography>
        <Column  gap={1} mt={1} mb={2}>
          <Typography fontWeight={700}>Enter using tokens</Typography>
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
        <RaffleActions raffleId={raffleId} onClick={onClickAction} />
      </Column>
    </ModalLayout>
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
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [entries, setEntries] = useState(1);
  const [entering, setEntering] = useState(false);
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
