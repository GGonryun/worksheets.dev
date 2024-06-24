import {
  Favorite,
  FavoriteBorder,
  HourglassBottom,
  ReportOutlined,
} from '@mui/icons-material';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { RemoveFriendModal } from '@worksheets/ui/components/friends';
import { GamesGroup } from '@worksheets/ui/components/games';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
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
          <Row justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Column gap={1}>
              <Typography
                color="text.arcade"
                typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.data.username || 'User'}
              </Typography>
              <Typography
                color="text.arcade"
                typography={{ xs: 'body1', sm: 'h6' }}
                fontWeight={{ xs: 700, sm: 700 }}
              >
                {user.data.exp} EXP
              </Typography>
            </Column>

            <FriendshipControls
              userId={userId}
              code={user.data.code}
              username={user.data.username}
            />
          </Row>
          <GamesGroup
            title="Recently Played"
            games={user.data.recentlyPlayed}
            empty={<NoGamesPlayed />}
          />
          <GamesGroup
            title="Top Games"
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

const FriendshipControls: React.FC<{
  userId: string;
  code: string;
  username: string;
}> = ({ userId, code, username }) => {
  const isMobile = useMediaQueryDown('sm');
  const session = useSession();
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const authenticated = session.status === 'authenticated';

  const canQuery = authenticated && session.data.user.id !== userId;

  const friendship = trpc.user.friends.friendship.useQuery(
    {
      friendId: userId,
    },
    {
      enabled: canQuery,
    }
  );

  const addFriend = trpc.user.friends.add.useMutation();
  const favorite = trpc.user.friends.favorite.useMutation();
  const removeFriend = trpc.user.friends.remove.useMutation();

  const [showRemove, setShowRemove] = useState(false);

  const handleFriendAction = async () => {
    if (!canQuery) return;

    if (friendship.data) {
      setShowRemove(true);
      return;
    }

    try {
      await addFriend.mutateAsync({ code });
      snackbar.success(`You are now following ${username}!`);
      utils.user.friends.friendship.invalidate({ friendId: userId });
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleRemoveFriend = async () => {
    if (!canQuery) return;

    if (!friendship.data) return;

    try {
      await removeFriend.mutateAsync({
        friendshipId: friendship.data.friendshipId,
      });
      snackbar.success(`Unfollowed ${username}!`);
      utils.user.friends.friendship.invalidate({ friendId: userId });
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleFavoriteFriend = async () => {
    if (!canQuery) return;

    if (!friendship.data) return;

    try {
      const { newState } = await favorite.mutateAsync({
        friendshipId: friendship.data.friendshipId,
      });
      snackbar.success(
        newState
          ? `${username} was added to your favorites!`
          : `${username} was removed from your favorites!`
      );
      utils.user.friends.friendship.invalidate({ friendId: userId });
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  if (friendship.isError || !canQuery) return null;

  return (
    <>
      <Row gap={1} sx={{ width: { xs: '100%', mobile1: 'auto' } }}>
        {!!friendship.data && (
          <Box>
            <Button
              variant="square"
              color={
                !friendship.isLoading && friendship.data.isFavorite
                  ? 'secondary'
                  : 'primary'
              }
              size={isMobile ? 'small' : 'medium'}
              disabled={friendship.isLoading || favorite.isLoading}
              onClick={handleFavoriteFriend}
            >
              {friendship.isLoading ? (
                <HourglassBottom fontSize="small" />
              ) : friendship.data.isFavorite ? (
                <Favorite fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </Button>
          </Box>
        )}
        <Button
          variant="arcade"
          color={friendship.data ? 'secondary' : 'success'}
          disabled={friendship.isLoading || addFriend.isLoading}
          size={isMobile ? 'small' : 'medium'}
          sx={{ width: { xs: '100%', mobile1: 'auto' } }}
          onClick={handleFriendAction}
        >
          {friendship.isLoading
            ? 'Loading...'
            : addFriend.isLoading
            ? 'Adding...'
            : removeFriend.isLoading
            ? 'Removing...'
            : friendship.data
            ? 'Following'
            : 'Follow'}
        </Button>
      </Row>
      <RemoveFriendModal
        open={showRemove}
        friendUsername={username}
        onClose={() => setShowRemove(false)}
        onRemove={handleRemoveFriend}
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
