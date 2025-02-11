'use client';

import { usePathname } from 'next/navigation';

import { AccountScreen } from '../components';
import { IntegrationsPanelContainer } from './integrations-panel-container';
import { DynamicInventoryPanel } from './inventory-panel';
import { NotificationsPanelContainer } from './notifications-panel-container';
import { SettingsPanelContainer } from './settings-panel-container';

export const AccountScreenContainer: React.FC = () => {
  const pathname = usePathname();

  return (
    <AccountScreen
      path={pathname}
      settingsPanel={<SettingsPanelContainer />}
      inventory={<DynamicInventoryPanel />}
      notificationsPanel={<NotificationsPanelContainer />}
      integrationsPanel={<IntegrationsPanelContainer />}
    />
  );
};

export default AccountScreenContainer;
