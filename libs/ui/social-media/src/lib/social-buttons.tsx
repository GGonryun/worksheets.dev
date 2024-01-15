import { Box, IconButton } from '@mui/material';
import {
  ColoredFacebook,
  ColoredReddit,
  ColoredTwitter,
} from '@worksheets/icons/companies';

export const SocialButtons: React.FC<{
  twitter?: string;
  facebook?: string;
  reddit?: string;
}> = ({ twitter, facebook, reddit }) => (
  <Box>
    {twitter && (
      <IconButton href={'#'} target="_blank" size="large">
        <ColoredTwitter fontSize="large" />
      </IconButton>
    )}
    {facebook && (
      <IconButton href={facebook} target="_blank" size="large">
        <ColoredFacebook fontSize="large" />
      </IconButton>
    )}
    {reddit && (
      <IconButton href={reddit} target="_blank" size="large">
        <ColoredReddit fontSize="large" />
      </IconButton>
    )}
  </Box>
);
