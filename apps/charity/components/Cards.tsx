import {
  Box,
  BoxProps,
  Divider,
  Link,
  Paper,
  darken,
  lighten,
  styled,
  useTheme,
} from '@mui/material';
import { CaptionText, SecondarySmallHeaderText } from './Typography';
import { ResponsiveImage } from './Images';
import {
  Delete,
  Favorite,
  ModeEdit,
  People,
  PlayCircle,
  SignalCellularAlt,
  SvgIconComponent,
  VideogameAsset,
} from '@mui/icons-material';
import { FC, JSXElementConstructor, ReactNode } from 'react';
import { useOnHover } from '../hooks/useOnHover';

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!ROOT_DOMAIN) throw new Error('Missing NEXT_PUBLIC_ROOT_DOMAIN env var');
// having a port in the domain implies we're in a local environment
const PROTOCOL = ROOT_DOMAIN.includes(':') ? 'http' : 'https';

export type TeamCardProps = {
  id: string;
  name: string;
  subdomain: string;
  growth: number;
  games: number;
  members: number;
};

export const TeamCard: FC<TeamCardProps> = ({
  id,
  name,
  subdomain,
  growth,
  games,
  members,
}) => {
  const domain = `${subdomain}.${ROOT_DOMAIN}`;
  const url = `/teams/${id}`;

  return (
    <CardSkeleton url={url} image="/art/team-placeholder.png">
      <Box gap={1} display="flex" flexDirection="column">
        <Link href={`${url}`} underline="none" color="inherit">
          <SecondarySmallHeaderText sx={{ pb: 1 }}>
            {name}
          </SecondarySmallHeaderText>
        </Link>
        <SubdomainBox>
          <Link
            underline="none"
            href={`${PROTOCOL}://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CaptionText>{domain}</CaptionText>
          </Link>
        </SubdomainBox>
        <Box display="flex" gap={1}>
          <IconBox
            Icon={SignalCellularAlt}
            text={`${growth}%`}
            color={'success'}
            href={`${url}/analytics`}
          />
          <IconBox
            Icon={VideogameAsset}
            text={`${games}`}
            color="secondary"
            href={`${url}`}
          />
          <IconBox
            Icon={People}
            text={`${members}`}
            color="primary"
            href={`${url}/settings/members`}
          />
        </Box>
      </Box>
    </CardSkeleton>
  );
};

type PaletteColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'highlight'
  | 'love'
  | 'default';
type GameStatus = 'published' | 'draft' | 'archived';

const gameStatusIconMap: Record<GameStatus, SvgIconComponent> = {
  published: PlayCircle,
  draft: ModeEdit,
  archived: Delete,
};

const gameStatusColorMap: Record<GameStatus, IconBoxProps['color']> = {
  published: 'success',
  draft: 'default',
  archived: 'error',
};

export type GameCardProps = {
  name: string;
  team: { subdomain: string; id: string };
  id: string;
  growth: number;
  favorites: number;
  status: GameStatus;
};
export const GameCard: FC<GameCardProps> = ({
  team,
  id,
  name,
  growth,
  favorites,
  status,
}) => {
  const domain = `${team.subdomain}.${ROOT_DOMAIN}/${id}`;
  const url = `/teams/${team.id}/games/${id}`;
  return (
    <CardSkeleton url={url} image="/art/team-placeholder.png">
      <Box gap={1} display="flex" flexDirection="column">
        <Link href={`${url}`} underline="none" color="inherit">
          <SecondarySmallHeaderText sx={{ pb: 1 }}>
            {name}
          </SecondarySmallHeaderText>
        </Link>
        <SubdomainBox>
          <Link
            underline="none"
            href={`${PROTOCOL}://${domain}`}
            target="_blank"
          >
            <CaptionText>{domain}</CaptionText>
          </Link>
        </SubdomainBox>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={1}>
            <IconBox
              Icon={SignalCellularAlt}
              text={`${growth}%`}
              color={'success'}
              href={`${url}/analytics`}
            />
            <IconBox
              Icon={Favorite}
              text={`${favorites}`}
              color="love"
              href={`${url}/followers`}
            />
          </Box>
          <IconBox
            Icon={gameStatusIconMap[status]}
            text={`${status}`.toUpperCase()}
            color={gameStatusColorMap[status]}
            href={`${url}/edit`}
          />
        </Box>
      </Box>
    </CardSkeleton>
  );
};

type CardSkeletonProps = {
  url: string;
  image: string;
  children: ReactNode;
};

const CardSkeleton: FC<CardSkeletonProps> = ({ url, image, children }) => {
  const { onMouseEnter, onMouseLeave, hover } = useOnHover();

  return (
    <Paper
      elevation={hover ? 7 : 3}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        overflow: 'hidden',
        width: 275,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: 150,
          overflow: 'hidden',
        }}
      >
        <Box position="absolute">
          <Link href={url} underline="none" color="inherit">
            <ResponsiveImage alt="image" src={image} />
          </Link>
        </Box>
      </Box>
      <Divider />
      <Box p={2} width="100%">
        {children}
      </Box>
    </Paper>
  );
};

const SubdomainBox = styled<JSXElementConstructor<BoxProps>>((props) => (
  <Box {...props} />
))(({ theme }) => ({
  overflow: 'hidden',
  maxWidth: '100%',
  width: 'fit-content',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 1),
  ':hover': {
    backgroundColor: theme.palette.grey[300],
    textDecoration: 'underline',
    textDecorationColor: theme.palette.grey[700],
  },
}));

type IconBoxProps = {
  href?: string;
  Icon: SvgIconComponent;
  text: string;
  color: PaletteColor;
};
const IconBox: FC<IconBoxProps> = ({ Icon, text, color, href }) => {
  const theme = useTheme();
  const lighterColor = lighten(theme.palette[color].light, 0.8);
  const lightColor = lighten(theme.palette[color].light, 0.6);
  const darkColor = darken(theme.palette[color].dark, 0.1);
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        width: 'min-content',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        rotateY: '180deg',
        px: 0.5,
        borderRadius: 1,
        backgroundColor: lighterColor,
        '&:hover': {
          backgroundColor: lightColor,
        },
      }}
    >
      <Icon
        sx={{
          fontSize: 16,
          '@media (max-width: 600px)': {
            fontSize: 14,
          },
          color: darkColor,
        }}
      />
      <CaptionText
        sx={{
          color: darkColor,
        }}
      >
        {text}
      </CaptionText>
    </Link>
  );
};
