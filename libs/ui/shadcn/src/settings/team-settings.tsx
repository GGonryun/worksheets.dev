import { TeamSettingsContent } from './team-settings-content';

export const TeamSettings: React.FC<{ activeTab: 'profile' | 'social' }> = ({
  activeTab,
}) => {
  return <TeamSettingsContent activeTab={activeTab} />;
};
