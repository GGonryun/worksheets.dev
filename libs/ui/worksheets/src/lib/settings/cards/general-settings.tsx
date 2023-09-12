import { SettingsCardTextField } from './text-field';

import React from 'react';
import { UserOverview } from '@worksheets/schemas-user';

export const GeneralSettings: React.FC<{ overview: UserOverview }> = ({
  overview,
}) => {
  return (
    <>
      <SettingsCardTextField
        title={'Your identifier'}
        readonly
        caption={'This is how we identify you in our system.'}
        helperText="You can't change this value."
        value={overview?.uid}
      />
      <SettingsCardTextField
        title={'Your name'}
        readonly
        caption={'Please enter a display name you are comfortable with.'}
        helperText="Display name is limited to 48 characters at most."
        value={overview?.meta.name ?? ''}
      />
      <SettingsCardTextField
        title={'Your email'}
        readonly
        caption={'The email address you use to log into your account.'}
        helperText="You can't change this value."
        value={overview?.meta.email ?? ''}
      />
    </>
  );
};
