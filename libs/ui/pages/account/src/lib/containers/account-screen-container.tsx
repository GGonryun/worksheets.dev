import { AccountScreen } from '../components';
import { SettingsPanelContainer } from './settings-panel-container';

const AccountScreenContainer: React.FC = () => {
  return (
    <AccountScreen
      settingsPanel={<SettingsPanelContainer />}
      // inventory={<DynamicInventoryPanel />}
    />
  );
};

export default AccountScreenContainer;
