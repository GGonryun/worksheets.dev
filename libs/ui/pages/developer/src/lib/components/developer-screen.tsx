import {
  ArrowRight,
  Facebook,
  GitHub,
  Instagram,
  Language,
  LinkedIn,
  Pinterest,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  IconButtonProps,
  Paper,
  Typography,
} from '@mui/material';
import { GamesGroup } from '@worksheets/ui/components/games';
import { FillImage } from '@worksheets/ui/components/images';
import { BasicGameInfo, DeveloperSchema } from '@worksheets/util/types';
import { FC } from 'react';

// TODO: support the following icons.
// AppStore,
// Discord,
// ItchIo,
// PlayStore,
// SteamGames,
// TikTok,
// TwitchTv,

export type DeveloperScreenProps = {
  name: string;
  description: string;
  avatarUrl: string;
  socials: DeveloperSchema['socials'];
  games: BasicGameInfo[];
};

export const DeveloperScreen: FC<DeveloperScreenProps> = ({
  name,
  description,
  socials,
  games,
  avatarUrl,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: { xs: 2, sm: 4 },
          color: 'text.arcade',
          backgroundColor: 'background.solid-blue',
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: 48,
              height: 48,
              borderRadius: '50%',
            }}
          >
            <FillImage alt={`${name} avatar`} src={avatarUrl} />
          </Box>
          <Typography variant="h4" mb={0.5}>
            {name}
          </Typography>
        </Box>
        <Typography variant="body1" mb={1}>
          {description}
        </Typography>
        <SocialButtons {...socials} />
        <br />
        <GamesGroup
          games={games.map((g) => ({
            id: g.id,
            name: g.name,
            imageUrl: g.image,
            caption: '',
          }))}
        />
        <br />
        <br />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Button
            variant="arcade"
            color="error"
            href="/"
            endIcon={<ArrowRight />}
          >
            All Games
          </Button>
          <Button
            variant="arcade"
            color="warning"
            href="/tags"
            endIcon={<ArrowRight />}
          >
            All Tags
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const SocialButtons: FC<DeveloperScreenProps['socials']> = ({
  facebook,
  twitter,
  instagram,
  youtube,
  twitch,
  discord,
  itchio,
  steam,
  playstore,
  pintrest,
  linkedin,
  appstore,
  tiktok,
  website,
  website2,
  github,
}) => {
  return (
    <Box m={-1}>
      <SocialIconButton href={facebook}>
        <Facebook
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
      <SocialIconButton href={twitter}>
        <Twitter
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
      <SocialIconButton href={instagram}>
        <Instagram
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
      <SocialIconButton href={youtube}>
        <YouTube
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>

      <SocialIconButton href={linkedin}>
        <LinkedIn
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>

      <SocialIconButton href={pintrest}>
        <Pinterest
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
      <SocialIconButton href={github}>
        <GitHub
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
      <SocialIconButton href={website}>
        <Language
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
      <SocialIconButton href={website2}>
        <Language
          fontSize="large"
          sx={{
            color: (theme) => theme.palette.text.arcade,
          }}
        />
      </SocialIconButton>
    </Box>
  );
};

// doesn't play nicely with styled so we made a component instead.
const SocialIconButton: FC<
  Pick<IconButtonProps, 'children'> & { href?: string }
> = ({ children, href }) => (
  <IconButton
    color="black"
    size="small"
    href={href ?? ''}
    sx={{
      display: href ? 'inline-flex' : 'none',
    }}
  >
    {children}
  </IconButton>
);
