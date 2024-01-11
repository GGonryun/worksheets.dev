import {
  ProfilePanel,
  BasicInformationFormContextProvider,
  BasicInformationForm,
} from '@worksheets/ui/pages/account';
import { Snackbar } from '@worksheets/ui/snackbar';
import { useBasicInformationForm } from './use-basic-information-form';

export const ProfilePanelContainer: React.FC<{
  profile: BasicInformationForm | null;
}> = ({ profile }) => {
  const { form, snackbar } = useBasicInformationForm(profile);

  return (
    <BasicInformationFormContextProvider value={form}>
      <ProfilePanel />
      <Snackbar
        {...snackbar}
        message={'Your profile has been updated!'}
        severity={'success'}
      />
    </BasicInformationFormContextProvider>
  );
};
