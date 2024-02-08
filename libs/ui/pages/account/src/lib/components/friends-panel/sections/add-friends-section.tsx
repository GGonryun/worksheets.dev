import { Add, FavoriteBorder, InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { SocialButtons } from '@worksheets/ui/components/social-media';
import { FriendsPanels, ReferralsPanels } from '@worksheets/util/enums';
import { useState } from 'react';

import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';

export const AddFriendsSection: React.FC<{
  friendCode: string;
  onAdd: (username: string) => void;
}> = (props) => {
  const referralsHref = `/account/referrals#${ReferralsPanels.ShareYourLink}`;
  const friendsListHref = `/account/friends#${FriendsPanels.FriendsList}`;
  const shareGiftsHref = `/account/friends#${FriendsPanels.SendGifts}`;

  const [username, setUsername] = useState('');
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
          <SocialButtons
            facebook={'#TODO'}
            twitter={'#TODO'}
            reddit={'#TODO'}
          />
        </Box>
        <ClipboardText text={props.friendCode} label="My Friend Code" />
      </Box>
      <Box
        sx={{
          display: 'flex',
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
          href: '/help/friends',
        }}
        action={{ text: 'Referrals', href: referralsHref }}
      />
    </Box>
  );
};
