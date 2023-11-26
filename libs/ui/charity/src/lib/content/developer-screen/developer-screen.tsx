import {
  Facebook,
  Instagram,
  Language,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  IconButtonProps,
  Paper,
  Typography,
} from '@mui/material';
import { Discord } from '@worksheets/ui-games';
import { FC } from 'react';
import { TwitchTv } from '../../icons/twitch-tv';
import { ItchIo } from '../../icons/itch-io';
import { TikTok } from '../../icons/tiktok';
import { SteamGames } from '../../icons/steam-games';
import { PlayStore } from '../../icons/play-store';
import { AppStore } from '../../icons/app-store';
import { GameDefinition } from '../../util/games';
import { ArrowUpRight } from '../../icons/arrow-up-right';
import { GamePill } from '../../pills';
import { DeveloperSchema } from '../../../types/developer-schema';

export type DeveloperScreenProps = {
  name: string;
  socials: DeveloperSchema['socials'];
  games: GameDefinition[];
};

export const DeveloperScreen: FC<DeveloperScreenProps> = ({
  name,
  socials,
  games,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          gap: 1,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h4" mb={0.5}>
          {name}
        </Typography>
        <SocialButtons {...socials} />
        <Divider sx={{ my: 1, mx: { xs: -2, sm: -4 } }} />
        <Typography variant="h5" mb={1}>
          Games by {name}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            desktop1: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
        >
          {games.map((d) => (
            <Box height={80} p={1} key={d.id}>
              <GamePill
                key={d.id}
                name={d.name}
                developer={name}
                imageUrl={d.imageUrl}
                href={`/g/${d.id}`}
              />
            </Box>
          ))}
        </Box>
        <Divider sx={{ my: 2, mx: { xs: -2, sm: -4 } }} />
        <Box>
          <Button
            variant="contained"
            color="error"
            href="/g"
            endIcon={<ArrowUpRight sx={{ ml: -0.5 }} />}
            sx={{
              borderRadius: 6,
              width: { xs: '100%', sm: 'auto' },
              px: { xs: 1, sm: 3 },
              py: { xs: 0.5, sm: 1 },
            }}
          >
            <Typography
              fontWeight={900}
              sx={{
                fontSize: { xs: 16, sm: 18 },
              }}
            >
              Explore All Games
            </Typography>
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
  appstore,
  tiktok,
  website,
}) => {
  return (
    <Box m={-1}>
      <SocialIconButton href={facebook}>
        <Facebook fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={twitter}>
        <Twitter fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={instagram}>
        <Instagram fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={youtube}>
        <YouTube fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={twitch}>
        <TwitchTv fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={discord}>
        <Discord fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={itchio}>
        <ItchIo fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={tiktok}>
        <TikTok fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={steam}>
        <SteamGames fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={playstore}>
        <PlayStore fontSize="large" sx={{ mr: -0.5, ml: 0.5 }} />
      </SocialIconButton>
      <SocialIconButton href={appstore}>
        <AppStore fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={website}>
        <Language fontSize="large" />
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
