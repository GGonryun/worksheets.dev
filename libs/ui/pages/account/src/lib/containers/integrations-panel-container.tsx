import { Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import {
  DiscordIntegration,
  SteamIntegration,
  TwitchIntegration,
  TwitterIntegration,
  YouTubeIntegration,
} from '@worksheets/ui/components/integrations';

export const IntegrationsPanelContainer: React.FC = () => {
  return (
    <Column gap={1}>
      <Typography variant="h4" gutterBottom>
        Integrations
      </Typography>
      <TwitchIntegration />
      <TwitterIntegration />
      <DiscordIntegration />
      <SteamIntegration />
      <YouTubeIntegration />
    </Column>
  );
};
