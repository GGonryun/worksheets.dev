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
import { FillImage } from '@worksheets/ui/images';
import { GamePill } from '@worksheets/ui/pills';
import { DeveloperSchema, GameDefinition } from '@worksheets/util/types';
import { FC } from 'react';

import {
  AppStore,
  Discord,
  ItchIo,
  PlayStore,
  SteamGames,
  TikTok,
  TwitchTv,
} from './icons';

export type DeveloperScreenProps = {
  name: string;
  description: string;
  avatarUrl: string;
  socials: DeveloperSchema['socials'];
  games: GameDefinition[];
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
          borderRadius: 4,
          gap: 1,
          p: { xs: 2, sm: 4 },
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
      </Paper>
      <Box
        my={2}
        display="grid"
        gridTemplateColumns={{
          xs: '100%',
          sm: 'repeat(2, 50%)',
          lg: 'repeat(3, 33%)',
        }}
      >
        {games.map((d) => (
          <Box height={80} p={1} key={d.id}>
            <GamePill
              key={d.id}
              name={d.name}
              developer={name}
              imageUrl={d.imageUrl}
              href={`/play/${d.id}`}
            />
          </Box>
        ))}
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          borderRadius: 4,
          gap: 1,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Button
          variant="contained"
          color="error"
          href="/"
          endIcon={<ArrowRight sx={{ ml: -0.5 }} />}
          sx={{
            borderRadius: 6,
            width: { xs: '100%', sm: 'fit-content' },
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
        <Button
          variant="outlined"
          color="error"
          href="/tags"
          endIcon={<ArrowRight sx={{ ml: -0.5 }} />}
          sx={{
            borderRadius: 6,
            width: { xs: '100%', sm: 'fit-content' },
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
            Explore All Tags
          </Typography>
        </Button>
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
      <SocialIconButton href={linkedin}>
        <LinkedIn fontSize="large" />
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
      <SocialIconButton href={pintrest}>
        <Pinterest fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={github}>
        <GitHub fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={website}>
        <Language fontSize="large" />
      </SocialIconButton>
      <SocialIconButton href={website2}>
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
