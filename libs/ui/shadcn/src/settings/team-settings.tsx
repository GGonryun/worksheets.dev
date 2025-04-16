import { TeamSettingsContent } from './team-settings-content';

export const TeamSettings = () => {
  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        <p className="text-muted-foreground">
          Update your organization's profile information
        </p>
      </div>
      <TeamSettingsContent />
    </div>
  );
};
