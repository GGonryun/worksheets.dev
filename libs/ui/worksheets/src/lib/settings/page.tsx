import { PageLayout } from '../page-layout';
import { SettingsTabs, SettingsTabIndex } from './tabs';
import { FC } from 'react';

export const SettingsPage: FC<{ tab?: SettingsTabIndex }> = ({
  tab: queryTab,
}) => {
  // TODO: apply a layout to the settings page and remove drop shadows.
  const tab = queryTab ?? SettingsTabIndex.General;
  return (
    <PageLayout title={'Settings'}>
      <SettingsTabs tab={tab} />
    </PageLayout>
  );
};
