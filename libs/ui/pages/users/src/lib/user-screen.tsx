import { ReportOutlined } from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { GamesGroup } from '@worksheets/ui/components/games';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const UserScreen: React.FC<{ userId: string }> = ({ userId }) => {
  const user = trpc.public.users.find.useQuery(String(userId), {
    enabled: !!userId,
  });
  const [open, setOpen] = useState(false);

  if (user.isLoading) return <LoadingScreen />;
  if (user.isError) return <ErrorScreen />;

  return (
    <>
      <Container>
        <Column p={{ xs: 2, sm: 4 }} gap={{ xs: 2, sm: 4 }}>
          <Typography
            color="text.arcade"
            typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
          >
            {user.data.username || 'User'}
          </Typography>
          <GamesGroup
            title="Recently Played"
            games={user.data.recentlyPlayed}
            empty={<NoGamesPlayed />}
          />
          <GamesGroup
            title="Top Games (30 Days)"
            games={user.data.mostPlayed}
            empty={<NoGamesPlayed />}
          />
          <ReportUser onClick={() => setOpen(true)} />
        </Column>
      </Container>
      <ReportUserModal
        userId={userId}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

const NoGamesPlayed: React.FC = () => (
  <Row flexWrap={'wrap'} gap={2}>
    <CharityGamesLogo size={72} />
    <Typography typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}>
      No games played
    </Typography>
  </Row>
);

const ReportUser: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const isMobile = useMediaQueryDown('sm');

  return (
    <Box mt={2}>
      <Button
        size={isMobile ? 'small' : 'medium'}
        variant="arcade"
        color="warning"
        startIcon={<ReportOutlined />}
        onClick={onClick}
      >
        Report User
      </Button>
    </Box>
  );
};

const ReportUserModal: React.FC<ModalWrapper<{ userId: string }>> = ({
  open,
  onClose,
  userId,
}) => {
  const handleClose = () => {
    onClose?.({}, 'backdropClick');
  };

  return (
    <InfoModal open={open} onClose={handleClose}>
      <ModalContent onClose={handleClose} userId={userId} />
    </InfoModal>
  );
};

const ModalContent: React.FC<{ userId: string; onClose: () => void }> = ({
  userId,
  onClose,
}) => {
  const snackbar = useSnackbar();
  const report = trpc.maybe.user.report.useMutation();

  const [text, setText] = useState('');

  const handleSubmit = async () => {
    try {
      await report.mutateAsync({ userId, text });
      snackbar.success('User reported');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      onClose();
    }
  };

  return (
    <Column gap={2}>
      <Typography variant="h5">Report User</Typography>
      <Column>
        <Typography variant="body2" fontWeight={700} gutterBottom>
          Reason for your report
        </Typography>
        <TextField
          size="small"
          minRows={3}
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Column>
      <Row>
        <Button
          size="small"
          variant="arcade"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Row>
    </Column>
  );
};

export const DynamicUserScreen = dynamic(() => Promise.resolve(UserScreen), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
