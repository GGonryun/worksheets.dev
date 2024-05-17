import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';
import { IntegrationProvider } from '@prisma/client';
import {
  Discord,
  NewTwitter,
  SteamGames,
  Twitch,
} from '@worksheets/icons/companies';

const GRADIENTS: Record<IntegrationProvider, string> = {
  [IntegrationProvider.STEAM]: 'linear-gradient(120deg, #00adee, #000000);',
  [IntegrationProvider.DISCORD]:
    'linear-gradient(145deg, #7289DA 11.5%, #4E6AD0 91.2%)',
  [IntegrationProvider.TWITCH]:
    'linear-gradient(145deg, rgba(119, 44, 232, 0.68) 11.5%, rgb(119, 44, 232) 91.2%)',
  [IntegrationProvider.TWITTER]:
    'linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)',
};

const ICONS: Record<IntegrationProvider, SvgIconComponent> = {
  [IntegrationProvider.STEAM]: SteamGames,
  [IntegrationProvider.DISCORD]: Discord,
  [IntegrationProvider.TWITCH]: Twitch,
  [IntegrationProvider.TWITTER]: NewTwitter,
};

export const IntegrationLogo: React.FC<{
  provider: IntegrationProvider;
}> = ({ provider }) => {
  const Icon = ICONS[provider];
  const gradient = GRADIENTS[provider];
  return (
    <Box
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        display: 'grid',
        placeItems: 'center',
        width: 'fit-content',
        aspectRatio: '1/1',
        p: 1,
        background: gradient,
      }}
    >
      <Icon fontSize={'large'} color="white" />
    </Box>
  );
};
