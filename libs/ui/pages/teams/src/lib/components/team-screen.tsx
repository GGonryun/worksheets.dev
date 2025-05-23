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
  Divider,
  IconButton,
  IconButtonProps,
  Typography,
} from '@mui/material';
import { routes } from '@worksheets/routes';
import { GamesGroup } from '@worksheets/ui/components/games';
import { FillImage } from '@worksheets/ui/components/images';
import {
  BasicGameInfo,
  SocialLinksSchema,
  TeamSchema,
} from '@worksheets/util/types';
import { FC } from 'react';

export type TeamScreenProps = {
  team: TeamSchema;
  games: BasicGameInfo[];
};

export const TeamScreen: FC<TeamScreenProps> = ({ team, games }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <br />
      <GamesGroup
        title={
          <Box display="flex" alignItems="center" gap={{ xs: 1.5, sm: 2 }}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                width: 48,
                height: 48,
                borderRadius: '50%',
              }}
            >
              <FillImage alt={`${team.name} avatar`} src={team.logo} />
            </Box>
            <Typography variant="h4" mb={0.5}>
              {team.name}
            </Typography>
          </Box>
        }
        header={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body1" mb={1}>
              {team.description}
            </Typography>
            <SocialButtons {...team.links} />
            <Divider sx={{ backgroundColor: 'text.arcade', mt: 2 }} />
          </Box>
        }
        pageSize={50}
        games={games}
        footer={
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
              href={routes.play.path()}
              endIcon={<ArrowRight />}
            >
              All Games
            </Button>
            <Button
              variant="arcade"
              color="warning"
              href={routes.categories.path()}
              endIcon={<ArrowRight />}
            >
              All Tags
            </Button>
          </Box>
        }
      />
    </Container>
  );
};

const SocialButtons: FC<SocialLinksSchema> = ({
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
  linkedIn,
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

      <SocialIconButton href={linkedIn}>
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
  Pick<IconButtonProps, 'children'> & { href?: string | null }
> = ({ children, href }) => {
  if (!href) return null;
  return (
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
};
