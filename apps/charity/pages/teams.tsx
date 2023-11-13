import { Box, Container } from '@mui/material';
import { HeaderText } from '../components/Typography';
import { TeamCard } from '../components/Cards';
import { GroupAdd } from '@mui/icons-material';
import { SubmissionButton } from '../components/Buttons';
import { useState } from 'react';
import { CreateTeamModal } from '../components/CreateTeamModal';

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
        <Box display="flex" flexWrap="wrap" gap={2}>
          <TeamCard
            name="Official"
            id="b18394h134980"
            subdomain="official"
            growth={32}
            games={2}
            members={2}
          />
          <TeamCard
            name="Test"
            id={'y3799n6c6x8ju1'}
            subdomain="reallylongsubdomainprobably"
            growth={0}
            games={0}
            members={1}
          />
        </Box>
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
