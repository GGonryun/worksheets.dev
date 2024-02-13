import { ArrowRightAlt } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { InvalidProfileAlert } from './invalid-profile-alert';

const SubmissionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const NoteBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(0, 2),
  borderLeft: '3px solid',
  borderColor: theme.palette.divider,
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export const SubmissionHeader: FC<{ invalidProfile: boolean | undefined }> = ({
  invalidProfile,
}) => (
  <SubmissionBox>
    <HeaderBox>
      <Typography
        typography={{ xs: 'h4', sm: 'h4', md: 'h4', lg: 'h3' }}
        component="h1"
      >
        Submit your game
      </Typography>
      <Button
        variant="arcade"
        color="primary"
        size="small"
        href="/account/submissions"
        endIcon={<ArrowRightAlt />}
        sx={{
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        All Submissions
      </Button>
    </HeaderBox>
    <Typography variant="body2" mt={2}>
      Follow the instructions below to submit your game for review. Once your
      game is approved, it will be added to our arcade and your game will start
      earning money for charity.
    </Typography>
    <NoteBox>
      <Typography variant="body2" fontWeight={700}>
        Increase your game&apos;s visibility
      </Typography>
      <Typography variant="body2">
        Review our{' '}
        <Link href="/help/developers#what-makes-a-quality-game">
          quality guidelines
        </Link>{' '}
        before submitting your game.
      </Typography>
    </NoteBox>
    <InvalidProfileAlert visible={invalidProfile} />
  </SubmissionBox>
);
