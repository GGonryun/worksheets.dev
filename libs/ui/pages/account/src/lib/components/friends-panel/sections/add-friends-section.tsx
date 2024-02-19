import { Add, FavoriteBorder, InfoOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import {
  addFriendsIntent,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { routes } from '@worksheets/ui/routes';
import {
  FriendsPanels,
  ReferralsPanels,
  SettingsPanels,
} from '@worksheets/util/enums';
import { useState } from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';

export const AddFriendsSection: React.FC<{
  addFriendCode?: string;
  friendCode?: string;
  onAdd: (username: string) => void;
}> = (props) => {
  const referralsHref = routes.account.referrals.path({
    bookmark: ReferralsPanels.ShareYourLink,
  });
  const friendsListHref = routes.account.friends.path({
    bookmark: FriendsPanels.FriendsList,
  });
  const shareGiftsHref = routes.account.friends.path({
    bookmark: FriendsPanels.SendGifts,
  });

  const [username, setUsername] = useState(props.addFriendCode || '');
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAddFriend = () => {
    props.onAdd(username);
    setUsername('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-start' },
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="h6">Share your Friend Code</Typography>
          {props.friendCode && (
            <SocialButtonsWrapper friendCode={props.friendCode} />
          )}
        </Box>
        {!props.friendCode ? (
          <Alert severity="error" sx={{ mb: 1 }}>
            <Link
              href={routes.account.path({
                bookmark: SettingsPanels.EditProfile,
              })}
            >
              Your profile is incomplete!
            </Link>{' '}
            Pick a username to get your friend code. You can share your friend
            code with your friends to earn tokens together.
          </Alert>
        ) : (
          <ClipboardText text={props.friendCode} label="My Friend Code" />
        )}
      </Box>
      <Box
        sx={{
          display: props.friendCode ? 'flex' : 'none',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FavoriteBorder color="secondary" fontSize="small" />
        <Typography variant="body2">
          Your friend code is unique to you and can be shared with anyone.
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h6">Add Friends</Typography>
        <Typography variant="body2">
          Ask your friends for their friend code and earn tokens together.
        </Typography>
      </Box>
      <TextField
        fullWidth
        value={username}
        onChange={handleUsernameChange}
        placeholder="awesome-friend-code-1234"
        size="small"
        label="Friend Code"
        helperText="Friend codes are case-sensitive."
      />
      <Button
        onClick={handleAddFriend}
        disabled={!username}
        variant="arcade"
        color="secondary"
        startIcon={<Add sx={{ mt: '-2px' }} />}
        sx={{
          width: { xs: '100%', sm: 'fit-content' },
        }}
      >
        Add Friend
      </Button>
      <Divider />
      <BulletPoints
        title="How It Works"
        icon={<InfoOutlined color="info" fontSize="small" />}
        points={[
          `Ask your friends for their friend code and enter it above.`,
          `If your friend has an account, you'll get a confirmation screen.`,
          <>
            If your friend doesn't have an account, get a{' '}
            <Link href={referralsHref}> Referral Link</Link> to send them.
            You'll both get tokens!
          </>,
          <>
            Manage your friends in the{' '}
            <Link href={friendsListHref}>Friends List</Link>.
          </>,
          <>
            <Link href={shareGiftsHref}>Send Gift Boxes</Link> to your friends
            and earn a gift box for yourself.
          </>,
        ]}
      />
      <PanelFooter
        learn={{
          text: 'Friends',
          href: routes.help.friends.path(),
        }}
        action={{ text: 'Referrals', href: referralsHref }}
      />
    </Box>
  );
};

const SocialButtonsWrapper: React.FC<{ friendCode: string }> = ({
  friendCode,
}) => {
  const intent = addFriendsIntent({ friendCode });

  return <SocialButtons facebook={intent.facebook} twitter={intent.twitter} />;
};
