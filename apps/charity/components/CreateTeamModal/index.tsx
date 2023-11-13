import { Box, Modal, Paper } from '@mui/material';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '@worksheets/trpc-charity';
import { AppRouter } from '@worksheets/trpc-charity/server';
import { FC, useState } from 'react';
import {
  DefaultInputBase,
  DenseButton,
  DenseInputLabel,
  InputErrorText,
  SecondarySmallHeaderText,
  SubdomainTextField,
  TextAreaAutoSize,
} from '@worksheets/ui-charity';

type CreateTeamInput = inferRouterInputs<AppRouter>['teams']['create'];
type CreateTeamErrorOutput = Extract<
  inferRouterOutputs<AppRouter>['teams']['create'],
  { ok: false }
>['errors'];

const EMPTY_FORM: CreateTeamInput = {
  name: '',
  subdomain: '',
  description: '',
};

export const CreateTeamModal: FC<{
  open: boolean;
  onClose: () => void;
  onCreate: (id: string) => void;
}> = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState<CreateTeamInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<CreateTeamErrorOutput>({});

  const createTeam = trpc.teams.create.useMutation();

  const handleCreate = async () => {
    try {
      setErrors({});
      const response = await createTeam.mutateAsync(form);
      if (!response.ok) {
        setErrors(response.errors ?? {});
      } else {
        setForm(EMPTY_FORM);
        onCreate(response.id);
      }
    } catch (error) {
      setErrors({
        unknown:
          'An unexpected error occured while creating your team, try again in a few minutes.',
      });
    }
  };

  const cleanSubdomain = (subdomain: string) => {
    return subdomain.toLowerCase().replace(/\s/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      name: e.target.value,
      subdomain: cleanSubdomain(e.target.value),
    });
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      subdomain: e.target.value,
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      description: e.target.value,
    });
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
              onChange={handleNameChange}
            />
            <InputErrorText error={errors.name} />
          </Box>
          <Box>
            <DenseInputLabel htmlFor="team-subdomain" sx={{ pb: 0.5 }}>
              Subdomain
            </DenseInputLabel>
            <SubdomainTextField
              id="team-subdomain"
              value={form.subdomain}
              onChange={handleSubdomainChange}
            />
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
              onChange={handleDescriptionChange}
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
          <InputErrorText error={errors.unknown} />
        </Box>
      </Paper>
    </Modal>
  );
};
