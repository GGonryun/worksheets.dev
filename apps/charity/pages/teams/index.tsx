import { Box, Container } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { useState } from 'react';
import { CreateTeamModal } from '../../components/CreateTeamModal';
import { HeaderText, SubmissionButton } from '@worksheets/ui-charity';
import { MyTeamsContainer } from '../../components/MyTeamsContainer';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <HeaderText>All Teams</HeaderText>
          <SubmissionButton
            sx={{
              textTransform: 'none',
            }}
            startIcon={<GroupAdd />}
            onClick={() => setShowModal(true)}
          >
            Create New Team
          </SubmissionButton>
        </Box>
        <MyTeamsContainer />
      </Container>
      <CreateTeamModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={(id) => {
          alert(`team created id = ${id}`);
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Page;
