import { FC, JSXElementConstructor } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { BioField, UsernameField } from './fields';
import { useBasicInformationFormContext } from './context';
import Alert, { AlertProps } from '@mui/material/Alert';

export const ProfilePanel: FC = () => {
  const { values, onSubmit, isValid, isUpdated } =
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
      <Typography variant="h5">Basic Information</Typography>

      <CustomAlert visible={!hasRequiredFields}>
        Your profile is incomplete. Please fill out the required fields below.
      </CustomAlert>

      <UsernameField />

      <BioField />

      <SubmissionButton onClick={() => onSubmit()} disabled={!canSave}>
        Save
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

const SubmissionButton = styled<JSXElementConstructor<ButtonProps>>((props) => (
  <Button startIcon={<SaveIcon />} variant="contained" {...props} />
))(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 8,
  padding: theme.spacing(0.5, 4),
  width: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
