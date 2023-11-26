import { Box, Link } from '@mui/material';
import {
  Delete,
  Favorite,
  ModeEdit,
  PlayCircle,
  SignalCellularAlt,
  SvgIconComponent,
  VisibilityOff,
} from '@mui/icons-material';
import { FC } from 'react';
import { SubdomainBox } from './subdomain-box';
import { CaptionText, SecondarySmallHeaderText } from '../typography';
import { CardSkeleton } from './card-skeleton';
import { IconBox, IconBoxProps } from './icon-box';
import { PROTOCOL, ROOT_DOMAIN } from '../util/env';

export type GameStatus = 'published' | 'draft' | 'archived' | 'restricted';

export const gameStatusIconMap: Record<GameStatus, SvgIconComponent> = {
  published: PlayCircle,
  draft: ModeEdit,
  archived: Delete,
  restricted: VisibilityOff,
};

export const gameStatusColorMap: Record<GameStatus, IconBoxProps['color']> = {
  published: 'success',
  draft: 'default',
  archived: 'error',
  restricted: 'warning',
};

export type GameCardProps = {
  name: string;
  team: { subdomain: string; id: string };
  id: string;
  image: string;
  growth: number;
  favorites: number;
  status: GameStatus;
};
export const GameCard: FC<GameCardProps> = ({
  team,
  id,
  name,
  image,
  growth,
  favorites,
  status,
}) => {
  const domain = `${team.subdomain}.${ROOT_DOMAIN}/${id}`;
  const url = `/teams/${team.id}/games/${id}`;
  return (
    <CardSkeleton url={url} image={image ?? '/art/team-placeholder.png'}>
      <Box gap={1} display="flex" flexDirection="column">
        <Link href={`${url}`} underline="none" color="inherit">
          <SecondarySmallHeaderText sx={{ pb: 1 }}>
            {name}
          </SecondarySmallHeaderText>
        </Link>
        <SubdomainBox>
          <Link
            marginX={1}
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
