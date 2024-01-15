import {
  Add,
  Diversity1Outlined,
  FavoriteBorder,
  InfoOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ValentinesHearts } from '@worksheets/icons/valentines';
import { ClipboardText } from '@worksheets/ui/inputs';
import { SocialButtons } from '@worksheets/ui/social-media';
import { useRouter } from 'next/router';

import { BulletPoints } from '../../bullet-points';
import { CollapsibleSection } from '../../collapsible-section';
import { PanelFooter } from '../../panel-footer';

export const AddFriendsSection: React.FC<{ friendCode: string }> = (props) => {
  const { query } = useRouter();
  const { open } = query;
  const isOpen = open === 'add';

  return (
    <CollapsibleSection
      text="Add Friends"
      description="Play with friends and earn more tokens for prizes."
      Icon={ValentinesHearts}
      status={<Diversity1Outlined fontSize="large" color="error" />}
      open={isOpen}
    >
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
          <FavoriteBorder color="love" fontSize="small" />
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
          placeholder="awesome-friend-code-1234"
          size="small"
          label="Friend Code"
        />
        <Button
          variant="round"
          color="love"
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
              <Link href="/account/referral"> Referral Link</Link> to send them.
              You'll both get tokens!
            </>,
          ]}
        />
        <PanelFooter
          learn={{
            text: 'Friends',
            href: '/help/friends',
          }}
          action={{ text: 'Referrals', href: '/account/referrals?open=share' }}
        />
      </Box>
    </CollapsibleSection>
  );
};
