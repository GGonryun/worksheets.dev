import Container from '@mui/material/Container';
import { Paper, styled } from '@mui/material';
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
  formErrors: Record<string, string>;
}> = ({ invalidProfile, formErrors }) => {
  return (
    <CustomContainer maxWidth="lg">
      <CustomPaper>
        <SubmissionHeader invalidProfile={invalidProfile} />
        <SubmitGameForm errors={formErrors} />
      </CustomPaper>
    </CustomContainer>
  );
};
