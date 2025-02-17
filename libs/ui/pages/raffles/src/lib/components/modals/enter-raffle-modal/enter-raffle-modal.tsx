import { CancelOutlined, HelpOutline } from '@mui/icons-material';
import { Box, Button, Link, Typography, useTheme } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { FillImage } from '@worksheets/ui/components/images';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import {
  InfoModal,
  ModalProps,
  ModalWrapper,
} from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { RaffleActions, TaskModal } from '@worksheets/ui/components/tasks';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { PaletteColor } from '@worksheets/ui/theme';
import { HTMLinator } from '@worksheets/ui-core';
import { fireAndForget } from '@worksheets/util/promises';
import { ActionSchema, TaskInputSchema } from '@worksheets/util/tasks';
import { printDateTime, printTimeRemaining } from '@worksheets/util/time';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { RaffleSchema } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
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
  const raffleId = raffle.id;
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const session = useSession();
  const [referralCode, setReferral] = useReferralCode();
  const actions = trpc.user.tasks.actions.list.useQuery(
    {
      raffleId,
    },
    {
      enabled: session.status === 'authenticated',
    }
  );
  const referral = trpc.public.referral.get.useQuery(referralCode, {
    enabled: Boolean(referralCode),
  });

  const trackAction = trpc.user.tasks.actions.track.useMutation();
  const handleClose = () => {
    onClose?.({}, 'backdropClick');
    setActionId(undefined);
  };

  const [actionId, setActionId] = useState<string | undefined>(undefined);
  const [dirty, setDirty] = useState<string[]>([]);

  useEffect(() => {
    if (!actions.isRefetching) {
      setDirty([]);
    }
  }, [actions.isRefetching]);

  const handleSubmit = async (input: TaskInputSchema) => {
    if (!actionId) return;

    try {
      setDirty((prev) => [...prev, actionId]);
      setActionId(undefined);
      const reward = await trackAction.mutateAsync({
        actionId,
        referralCode,
        ...input,
      });

      if (reward) {
        fireAndForget(
          Promise.all([
            utils.user.tasks.actions.list.refetch({ raffleId }),
            utils.user.raffles.participation.refetch(),
            utils.maybe.raffles.participants.refetch({ raffleId }),
          ])
        );
        snackbar.success(`You received ${reward} raffle entries!`);
      } else {
        snackbar.success('Action completed!');
      }
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
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
        actions={data.sort(sortRules)}
        onClickAction={setActionId}
        referral={referral.data ?? null}
        onClearReferral={() => setReferral('')}
      />
      <RaffleActionModal
        isPending={
          trackAction.isPending && !!actionId && dirty.includes(actionId)
        }
        onSubmit={handleSubmit}
        onClose={() => setActionId(undefined)}
        action={data?.find((a) => a.actionId === actionId)}
      />
    </>
  );
};

const sortRules = (a: ActionSchema, b: ActionSchema) => {
  // move all completed actions to the bottom
  if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
  if (b.status === 'COMPLETED' && a.status !== 'COMPLETED') return -1;

  // sort by order
  return a.order - b.order;
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
  onClearReferral: () => void;
  referral: { username: string; id: string } | null;
}> = ({
  dirty,
  actions,
  open,
  onClose,
  raffle,
  onClickAction,
  referral,
  onClearReferral,
}) => {
  const theme = useTheme();
  const participation = useYourEntries(raffle.id);

  // TODO: find a more elegant way to clear self-referral, maybe at a higher level in the app.
  useEffect(() => {
    if (
      referral &&
      participation.data &&
      referral.id === participation.data.user.id
    ) {
      onClearReferral();
    }
  }, [participation.data, referral, onClearReferral]);

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
          <HTMLinator
            sx={{
              my: 1,
              fontSize: {
                xs: theme.typography.body2.fontSize,
                sm: theme.typography.body1.fontSize,
              },
            }}
          >
            {raffle.description}
          </HTMLinator>
          <Typography
            color="text.primary"
            typography={{ xs: 'body3', sm: 'body2' }}
          >
            <b>Total Winners:</b> 1
          </Typography>
          {participation.data?.user.id && (
            <Typography
              color="text.primary"
              typography={{ xs: 'body3', sm: 'body2' }}
            >
              <b>Entering As:</b>{' '}
              <Link
                color="inherit"
                display="inline-flex"
                gap={0.5}
                target="_blank"
                alignItems="center"
                href={routes.account.path()}
              >
                {participation.data.user.username}
              </Link>
            </Typography>
          )}
          {referral && (
            <Typography
              color="text.primary"
              typography={{ xs: 'body3', sm: 'body2' }}
            >
              <b>Referred By:</b> {referral.username}
            </Typography>
          )}
          <Typography
            color="text.secondary"
            typography={{ xs: 'body3', sm: 'body2' }}
          >
            <b>Started At:</b> {printDateTime(raffle.publishAt)}
          </Typography>
          <Typography
            color="text.secondary"
            typography={{ xs: 'body3', sm: 'body2' }}
          >
            <b>Expires At:</b> {printDateTime(raffle.expiresAt)}
          </Typography>
        </Column>

        <RaffleActions
          raffleId={raffle.id}
          actions={actions}
          onClick={onClickAction}
          dirty={dirty}
        />
        <Column
          alignSelf="flex-start"
          mb={1}
          sx={{
            '& .MuiButton-root': {
              justifyContent: 'flex-start',
            },
          }}
        >
          <Button
            variant="text"
            href={routes.help.prizes.path()}
            target="_blank"
            startIcon={<HelpOutline />}
            fullWidth
            sx={{}}
          >
            Help Center
          </Button>
          {referral && (
            <Button
              color="error"
              startIcon={<CancelOutlined />}
              onClick={onClearReferral}
              fullWidth
            >
              Clear Referral
            </Button>
          )}
        </Column>
      </Column>
    </ModalLayout>
  );
};

const RaffleEntrants: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const participants = trpc.maybe.raffles.participants.useQuery({
    raffleId,
  });

  if (participants.isPending || participants.isRefetching)
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

  if (participants.isPending || participants.isRefetching)
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

  if (participation.isPending || participation.isRefetching)
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

const RaffleActionModal: React.FC<{
  onClose: () => void;
  onSubmit: (input: TaskInputSchema) => void;
  action?: ActionSchema;
  isPending: boolean;
}> = ({ onClose, action, isPending, onSubmit }) => {
  if (!action) return null;

  return (
    <TaskModal
      onClose={onClose}
      open={Boolean(action)}
      isPending={isPending}
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
