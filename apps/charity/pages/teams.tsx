import { Box, Container, Modal, Paper } from '@mui/material';
import { HeaderText, SecondarySmallHeaderText } from '../components/Typography';
import { TeamCard } from '../components/Cards';
import { GroupAdd } from '@mui/icons-material';
import { DenseButton, SubmissionButton } from '../components/Buttons';
import { FC, useState } from 'react';
import {
  DefaultInputBase,
  InputErrorText,
  DenseInputLabel,
  SubdomainTextField,
  TextAreaAutoSize,
} from '../components/InputFields';
import { trpc } from '@worksheets/trpc-charity';

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

type CreateTeamForm = {
  name: string;
  subdomain: string;
  description: string;
};

const CreateTeamModal: FC<{
  open: boolean;
  onClose: () => void;
  onCreate: (id: string) => void;
}> = ({ open, onClose, onCreate }) => {
  // TODO: handle form submission
  const [form, setForm] = useState<CreateTeamForm>({
    name: '',
    subdomain: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<CreateTeamForm>>({});

  const createTeam = trpc.teams.create.useMutation();

  const handleCreate = async () => {
    setErrors({});
    const response = await createTeam.mutateAsync(form);
    if (!response.ok) {
      setErrors(response.errors ?? {});
    } else {
      onCreate(response.id);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'transparent',
        },
      }}
    >
      <Paper
        elevation={5}
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'scroll',
        }}
      >
        <Box p={2} display="flex" flexDirection="column" gap={1}>
          <SecondarySmallHeaderText>Create New Team</SecondarySmallHeaderText>
          <Box>
            <DenseInputLabel htmlFor="team-name" sx={{ pb: 0.5 }}>
              Team Name
            </DenseInputLabel>
            <DefaultInputBase
              fullWidth
              id="team-name"
              placeholder="My Awesome Team"
              value={form.name}
            />
            <InputErrorText error={errors.name} />
          </Box>
          <Box>
            <DenseInputLabel htmlFor="team-subdomain" sx={{ pb: 0.5 }}>
              Subdomain
            </DenseInputLabel>
            <SubdomainTextField id="team-subdomain" value={form.subdomain} />
            <InputErrorText error={errors.subdomain} />
          </Box>
          <Box>
            <DenseInputLabel htmlFor="team-description" sx={{ pb: 0.5 }}>
              Description
            </DenseInputLabel>
            <TextAreaAutoSize
              id="team-description"
              placeholder="This is an awesome team"
              minRows={4}
              sx={{ width: '100%' }}
              value={form.description}
            />
            <InputErrorText error={errors.description} />
          </Box>
        </Box>
        <Box
          p={2}
          sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
          }}
        >
          <DenseButton
            color="primary"
            fullWidth
            onClick={handleCreate}
            disabled={createTeam.isLoading}
          >
            Create Team
          </DenseButton>
        </Box>
      </Paper>
    </Modal>
  );
};

export default Page;
