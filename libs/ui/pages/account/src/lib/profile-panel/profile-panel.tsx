import SaveIcon from '@mui/icons-material/Save';
import { CircularProgress } from '@mui/material';
import Alert, { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { FC, JSXElementConstructor } from 'react';

import { PanelHeader } from '../panel-header';
import { useBasicInformationFormContext } from './context';
import { BioField, UsernameField } from './fields';

export const ProfilePanel: FC = () => {
  const { values, loading, onSubmit, isValid, isUpdated } =
    useBasicInformationFormContext();

  const canSave = isValid() && isUpdated();

  const hasRequiredFields = Boolean(values.username);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <PanelHeader primary="Profile" />

      <CustomAlert visible={!hasRequiredFields}>
        Your profile is incomplete. Please fill out the required fields below.
      </CustomAlert>

      <UsernameField />

      <BioField />

      <SubmissionButton
        loading={loading}
        onClick={() => {
          !loading && onSubmit();
        }}
        disabled={!canSave}
      >
        {loading ? 'Loading...' : 'Save'}
      </SubmissionButton>
    </Box>
  );
};

const CustomAlert = styled<
  JSXElementConstructor<AlertProps & { visible: boolean }>
>((props) => <Alert severity="error" {...props} />, {
  shouldForwardProp: (prop) => prop !== 'visible',
})(({ visible }) => ({
  display: visible ? 'flex' : 'none',
}));

const SubmissionButton = styled<
  JSXElementConstructor<ButtonProps & { loading: boolean }>
>(({ loading, ...props }) => (
  <Button
    startIcon={
      loading ? <CircularProgress color="white" size="1rem" /> : <SaveIcon />
    }
    variant="contained"
    {...props}
  />
))(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 8,
  padding: theme.spacing(0.5, 4),
  width: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
