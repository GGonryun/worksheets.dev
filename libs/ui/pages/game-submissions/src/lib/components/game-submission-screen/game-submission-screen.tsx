import { Box, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import { StickyContactBox } from '@worksheets/ui/components/qa-section';
import { FC } from 'react';

import { SubmissionHeader } from './submission-header';
import { SubmitGameForm } from './submit-game-form';

const CustomContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 4,
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const GameSubmissionScreen: FC<{
  invalidProfile: boolean;
}> = ({ invalidProfile }) => {
  return (
    <CustomContainer maxWidth="xl">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '100%', sm: '100%', md: '67% 30%' },
          justifyContent: 'space-around',
          gap: 3,
        }}
      >
        <CustomPaper>
          <SubmissionHeader invalidProfile={invalidProfile} />
          <SubmitGameForm />
        </CustomPaper>

        <StickyContactBox
          freeSolo
          text={
            'Need help with your game submission? Our team is standing by, ready to assist you.'
          }
        />
      </Box>
    </CustomContainer>
  );
};
