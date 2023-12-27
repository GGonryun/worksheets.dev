import { GitHub } from '@mui/icons-material';
import {
  ColoredGoogle,
  ColoredReddit,
  ColoredDiscord,
} from '@worksheets/ui/icons';
import { SocialProviderButton } from './social-provider-button';
import { FC } from 'react';

export type SocialProvidersProps = {
  onGoogleAction?: () => void;
  onDiscordAction?: () => void;
  onGithubAction?: () => void;
  onRedditAction?: () => void;
};

export const SocialProviders: FC<SocialProvidersProps> = ({
  onGoogleAction,
  onDiscordAction,
  onGithubAction,
  onRedditAction,
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
    <SocialProviderButton
      startIcon={<ColoredReddit />}
      onClick={onRedditAction}
    >
      Reddit
    </SocialProviderButton>

    <SocialProviderButton startIcon={<GitHub />} onClick={onGithubAction}>
      GitHub
    </SocialProviderButton>
  </>
);
