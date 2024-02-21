import { GitHub } from '@mui/icons-material';
import { ColoredDiscord, ColoredGoogle } from '@worksheets/icons/companies';
import { FC } from 'react';

import { SocialProviderButton } from './social-provider-button';

export type SocialProvidersProps = {
  onGoogleAction?: () => void;
  onDiscordAction?: () => void;
  onGithubAction?: () => void;
};

export const SocialProviders: FC<SocialProvidersProps> = ({
  onGoogleAction,
  onDiscordAction,
  onGithubAction,
}) => (
  <>
    <SocialProviderButton
      startIcon={<ColoredGoogle />}
      onClick={onGoogleAction}
    >
      Google
    </SocialProviderButton>
    <SocialProviderButton
      startIcon={<ColoredDiscord />}
      onClick={onDiscordAction}
    >
      Discord
    </SocialProviderButton>

    <SocialProviderButton startIcon={<GitHub />} onClick={onGithubAction}>
      GitHub
    </SocialProviderButton>
  </>
);
