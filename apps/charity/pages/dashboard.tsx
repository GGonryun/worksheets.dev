import { Box, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Diversity3 } from '@mui/icons-material';
import {
  HeaderText,
  SubHeaderText,
  SubmissionButton,
} from '@worksheets/ui-charity';
import { MyTeamsContainer } from '../components/MyTeamsContainer';

const Page = () => {
  const { data: session } = useSession();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <HeaderText>Dashboard: {session?.user.username}</HeaderText>
      <Box display="flex" justifyContent="space-between">
        <SubHeaderText>Your Teams</SubHeaderText>
        <SubmissionButton
          sx={{
            textTransform: 'none',
          }}
          startIcon={<Diversity3 />}
          href="/teams"
        >
          View All Teams
        </SubmissionButton>
      </Box>
      <MyTeamsContainer />
      <SubHeaderText>Your Games</SubHeaderText>
    </Container>
  );
};

export default Page;
