import { Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { HelpTokensQuestions } from '@worksheets/util/enums';
import { RAFFLE_ENTRY_FEE } from '@worksheets/util/settings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import pluralize from 'pluralize';
import { useState } from 'react';

export const EnterRaffleModal: React.FC<
  ModalWrapper<{
    raffleId: number;
    tokensOwned: number;
  }>
> = ({ raffleId, open, onClose, tokensOwned }) => {
  const [step, setStep] = useState<'confirm' | 'select'>('confirm');

  const handleClose = () => {
    setStep('confirm');
    onClose?.({}, 'backdropClick');
  };

  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography variant={'h5'} color="primary" pt={2}>
        Enter Raffle
      </Typography>
      <Typography fontWeight={700}>You own {tokensOwned} tokens</Typography>
      {tokensOwned < RAFFLE_ENTRY_FEE ? (
        <InsufficientTokensContent />
      ) : step === 'confirm' ? (
        <ConfirmEntryContent onConfirm={() => setStep('select')} />
      ) : (
        <SelectEntriesModal
          raffleId={raffleId}
          onClose={handleClose}
          tokensOwned={tokensOwned}
        />
      )}
    </BasicModal>
  );
};

const InsufficientTokensContent: React.FC = () => {
  return (
    <Column width="100%">
      <Typography>
        You need at least {RAFFLE_ENTRY_FEE} tokens to enter the raffle!
      </Typography>
      <br />
      <Button
        href={routes.help.tokens.path({
          bookmark: HelpTokensQuestions.HowToEarn,
        })}
        fullWidth
        size="medium"
        variant="arcade"
      >
        Get more tokens
      </Button>
    </Column>
  );
};

const ConfirmEntryContent: React.FC<{
  onConfirm: () => void;
}> = (props) => {
  return (
    <Column gap={1} width="100%">
      <Typography>1 entry = {RAFFLE_ENTRY_FEE} tokens</Typography>

      <Button
        onClick={props.onConfirm}
        fullWidth
        size="medium"
        variant="arcade"
        color="error"
      >
        Enter Raffle
      </Button>

      <Button href={routes.help.tokens.path()}>Need more tokens?</Button>
    </Column>
  );
};

const SelectEntriesModal: React.FC<{
  tokensOwned: number;
  raffleId: number;
  onClose: () => void;
}> = (props) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [entries, setEntries] = useState(1);
  const [entering, setEntering] = useState(false);
  const enterRaffle = trpc.user.raffles.enterRaffle.useMutation();

  const tooManyEntries = entries > props.tokensOwned / RAFFLE_ENTRY_FEE;

  const handleSetEntries = (value: number) => {
    if (value > props.tokensOwned / RAFFLE_ENTRY_FEE) {
      snackbar.error('You do not have enough tokens for that many entries');
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

  if (entering) return <PulsingLogo message="Entering raffle..." />;

  return (
    <Column gap={1}>
      <NumericCounterField value={entries} onChange={handleSetEntries} />
      <Typography
        mt={1}
        variant="body2"
        color={tooManyEntries ? 'error.main' : 'text.secondary'}
        fontWeight={500}
      >
        Cost: {entries * RAFFLE_ENTRY_FEE} tokens
      </Typography>

      <Button
        fullWidth
        size="medium"
        variant="arcade"
        color="success"
        disabled={entering || tooManyEntries}
        onClick={handleEnterRaffle}
      >
        Purchase {entries} {pluralize('entry', entries)}
      </Button>
      <Typography
        display={tooManyEntries ? 'block' : 'none'}
        variant="body2"
        color={tooManyEntries ? 'error.main' : 'text.secondary'}
        fontWeight={500}
      >
        Insufficient tokens!
      </Typography>
    </Column>
  );
};
