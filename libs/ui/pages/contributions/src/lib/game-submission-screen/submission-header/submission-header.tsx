import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import Link from '@mui/material/Link';
import { InvalidProfileAlert } from './invalid-profile-alert';

const SubmissionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const NoteBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  padding: theme.spacing(0, 2),
  borderLeft: '3px solid',
  borderColor: theme.palette.divider,
}));

export const SubmissionHeader: FC<{ invalidProfile: boolean | undefined }> = ({
  invalidProfile,
}) => (
  <SubmissionBox>
    <Typography variant="h3" component="h1">
      Submit your game
    </Typography>
    <Typography variant="body2">
      Follow the instructions below to submit your game for review. Once your
      game is approved, it will be added to our arcade and your game will start
      earning money for charity.
    </Typography>
    <NoteBox>
      <Typography variant="body2" fontWeight={700}>
        Increase your game&apos;s visibility
      </Typography>
      <Typography variant="body2">
        Review our <Link href="/contribute/guidelines">quality guidelines</Link>{' '}
        before submitting your game.
      </Typography>
    </NoteBox>
    <InvalidProfileAlert visible={invalidProfile} />
  </SubmissionBox>
);
