import { AccountCircleOutlined, Error, Save } from '@mui/icons-material';
import {
  Alert,
  AlertProps,
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  styled,
  Typography,
} from '@mui/material';
import { ValentinesProfile } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { SettingsPanels } from '@worksheets/util/enums';
import { JSXElementConstructor } from 'react';

import { CollapsibleSection } from '../../../components/collapsible-section';
import { useBasicInformationFormContext } from '../context/hook';
import { BioField } from '../fields/bio';
import { UsernameField } from '../fields/username';

export const ProfileSection: React.FC<{
  active: SettingsPanels | undefined;
  onClick: (id: string) => void;
}> = ({ active, onClick }) => {
  const { values, loading, onSubmit, isValid, isUpdated } =
    useBasicInformationFormContext();

  const canSave = isValid() && isUpdated();

  const hasRequiredFields = Boolean(values.username);

  return (
    <CollapsibleSection
      id={SettingsPanels.EditProfile}
      active={active}
      onClick={onClick}
      text={`Edit Profile`}
      description="Change your public settings like your username, bio, and avatar."
      Icon={ValentinesProfile}
      status={
        hasRequiredFields ? (
          <AccountCircleOutlined fontSize="large" color="info" />
        ) : (
          <Error fontSize="large" color="error" />
        )
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Change public settings</Typography>

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
        <PanelFooter
          learn={{
            text: 'Account & Profile',
            href: routes.help.accounts.path(),
          }}
        />
      </Box>
    </CollapsibleSection>
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
      loading ? <CircularProgress color="white" size="1rem" /> : <Save />
    }
    size="small"
    variant="arcade"
    {...props}
  />
))(({ theme }) => ({
  width: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
