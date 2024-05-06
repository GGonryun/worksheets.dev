import {
  ArrowBack,
  FeaturedVideoOutlined,
  StarBorder,
} from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { WatchAdvertisement } from '@worksheets/ui/components/advertisements';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { HelpTokensQuestions } from '@worksheets/util/enums';
import {
  MAX_AD_RAFFLE_USES,
  RAFFLE_ENTRIES_PER_AD,
  RAFFLE_ENTRY_FEE,
} from '@worksheets/util/settings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { UserParticipationSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';
import { useState } from 'react';

export const EnterRaffleModal: React.FC<
  ModalWrapper<{
    raffleId: number;
  }>
> = ({ raffleId, open, onClose }) => {
  return (
    <BasicModal open={open} onClose={onClose}>
      <ModalContent
        raffleId={raffleId}
        onClose={() => onClose?.({}, 'backdropClick')}
      />
    </BasicModal>
  );
};

const ModalContent: React.FC<{ raffleId: number; onClose: () => void }> = ({
  raffleId,
  onClose,
}) => {
  const tokens = trpc.user.inventory.quantity.useQuery('1');
  const participation = trpc.user.raffles.participation.useQuery({
    raffleId,
  });

  const [step, setStep] = useState<'initial' | 'tokens' | 'advertisement'>(
    'initial'
  );

  const handleClose = () => {
    setStep('initial');
    onClose();
  };

  const handleCancel = () => {
    setStep('initial');
  };

  if (
    participation.isLoading ||
    tokens.isLoading ||
    tokens.isFetching ||
    tokens.isRefetching ||
    participation.isFetching ||
    participation.isRefetching
  )
    return <PulsingLogo />;
  if (participation.isError || tokens.isError) return <ErrorComponent />;

  return (
    <Column gap={1}>
      <Typography
        typography={{ xs: 'h5', sm: 'h4' }}
        color={
          step === 'initial'
            ? 'primary.main'
            : step === 'tokens'
            ? 'success.main'
            : 'secondary.main'
        }
        gutterBottom
      >
        Enter Raffle
      </Typography>

      {step === 'initial' ? (
        <InitialContent
          participation={participation.data}
          onUseTokens={() => setStep('tokens')}
          onWatchAd={() => setStep('advertisement')}
          tokensOwned={tokens.data}
        />
      ) : step === 'tokens' ? (
        <UseTokensContent
          tokensOwned={tokens.data}
          raffleId={raffleId}
          onClose={handleClose}
          onCancel={handleCancel}
        />
      ) : (
        <WatchAdvertisementContent
          raffleId={raffleId}
          participation={participation.data}
          onClose={handleClose}
          onCancel={handleCancel}
        />
      )}
      <Button
        sx={{ mt: 1 }}
        href={routes.help.tokens.path({
          bookmark: HelpTokensQuestions.HowToEarn,
        })}
        fullWidth
        size="medium"
        variant="text"
      >
        Get more tokens
      </Button>
    </Column>
  );
};

const InitialContent: React.FC<{
  participation: UserParticipationSchema;
  tokensOwned: number;
  onUseTokens: () => void;
  onWatchAd: () => void;
}> = (props) => {
  return (
    <Column width="100%" gap={2}>
      <Typography fontWeight={600}>
        You can enter a raffle using tokens or by watching advertisements.{' '}
      </Typography>
      <Column>
        <Typography>
          One raffle entry costs {RAFFLE_ENTRY_FEE} tokens.
        </Typography>
        <Typography>
          Watching an ad will give you {RAFFLE_ENTRIES_PER_AD} free entries.
        </Typography>
      </Column>

      <Column>
        <Column>
          <Typography fontWeight={700} variant="body2">
            You own {props.tokensOwned} tokens
          </Typography>
        </Column>

        <Button
          sx={{ my: 1 }}
          startIcon={<StarBorder />}
          onClick={props.onUseTokens}
          variant="arcade"
          color="success"
        >
          Enter Raffle
        </Button>
        <Button
          disabled={props.participation.adsWatched >= MAX_AD_RAFFLE_USES}
          variant="arcade"
          color="secondary"
          onClick={props.onWatchAd}
          startIcon={<FeaturedVideoOutlined />}
        >
          Watch Ad ({props.participation.adsWatched}/{MAX_AD_RAFFLE_USES})
        </Button>
      </Column>
    </Column>
  );
};

const UseTokensContent: React.FC<{
  tokensOwned: number;
  raffleId: number;
  onClose: () => void;
  onCancel: () => void;
}> = (props) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [entries, setEntries] = useState(1);
  const [entering, setEntering] = useState(false);
  const enterRaffle = trpc.user.raffles.enterRaffle.useMutation();

  const tooManyEntries = entries > props.tokensOwned / RAFFLE_ENTRY_FEE;

  const handleSetEntries = (value: number) => {
    if (value > props.tokensOwned / RAFFLE_ENTRY_FEE) {
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

  if (entering) return <PulsingLogo message="Entering raffle..." />;

  return (
    <Column gap={2}>
      <Typography fontWeight={600} gutterBottom>
        How many entries would you like to purchase?
      </Typography>
      <Column>
        <NumericCounterField value={entries} onChange={handleSetEntries} />
        <Typography
          mt={1}
          variant="body2"
          color={tooManyEntries ? 'error.main' : 'text.secondary'}
          fontWeight={500}
        >
          Cost: {entries * RAFFLE_ENTRY_FEE} tokens
        </Typography>
      </Column>

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
        <Button
          startIcon={<ArrowBack />}
          fullWidth
          size="medium"
          variant="arcade"
          onClick={props.onCancel}
        >
          Back
        </Button>
        <Typography
          display={tooManyEntries ? 'block' : 'none'}
          variant="body2"
          color={tooManyEntries ? 'error.main' : 'text.secondary'}
          fontWeight={700}
        >
          {props.tokensOwned < RAFFLE_ENTRY_FEE
            ? `You need at least ${RAFFLE_ENTRY_FEE} tokens to enter the raffle!`
            : `Insufficient Tokens!`}
        </Typography>
      </Column>
    </Column>
  );
};

const WatchAdvertisementContent: React.FC<{
  participation: UserParticipationSchema;
  raffleId: number;
  onClose: () => void;
  onCancel: () => void;
}> = ({ onClose, onCancel, raffleId, participation }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [entering, setEntering] = useState(false);
  const enterRaffle = trpc.user.raffles.bonusEntry.useMutation();
  const completed = participation.adsWatched >= MAX_AD_RAFFLE_USES;

  const handleSubmit = async () => {
    try {
      setEntering(true);
      await enterRaffle.mutateAsync({
        raffleId,
      });
      await utils.user.raffles.participation.refetch();
      snackbar.success(`You received ${RAFFLE_ENTRIES_PER_AD} free entries!`);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setEntering(false);
    }
  };

  if (entering) return <PulsingLogo message="Processing entries..." />;

  return (
    <Column gap={1}>
      <Typography fontWeight={600} gutterBottom>
        Watch an advertisement and receive {RAFFLE_ENTRIES_PER_AD} free entries!
      </Typography>
      <WatchAdvertisement
        network={'gruvian'}
        onSubmit={handleSubmit}
        disabled={completed}
        buttonColor="secondary"
        buttonText={
          completed
            ? 'No Ads Left'
            : `Watch Ad (${participation.adsWatched}/${MAX_AD_RAFFLE_USES})`
        }
      />
      <Button variant="arcade" onClick={onCancel} startIcon={<ArrowBack />}>
        Back
      </Button>
    </Column>
  );
};
