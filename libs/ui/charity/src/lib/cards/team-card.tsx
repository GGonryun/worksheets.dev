import { Box, Link } from '@mui/material';
import { People, SignalCellularAlt, VideogameAsset } from '@mui/icons-material';
import { FC } from 'react';
import { CardSkeleton } from './card-skeleton';
import {
  CaptionText,
  ParagraphText,
  SecondarySmallHeaderText,
} from '../typography';
import { SubdomainBox } from './subdomain-box';
import { IconBox } from './icon-box';
import { ROOT_DOMAIN, PROTOCOL } from '../util/env';

export type TeamCardProps = {
  id: string;
  name: string;
  subdomain: string;
  description?: string | null;
  image?: string;
  // TODO: calculate growth
  growth?: number;
  games: number;
  members: number;
};

export const TeamCard: FC<TeamCardProps> = ({
  id,
  name,
  subdomain,
  description,
  growth,
  games,
  image,
  members,
}) => {
  const domain = `${subdomain}.${ROOT_DOMAIN}`;
  const url = `/teams/${id}`;

  return (
    <CardSkeleton url={url} image={image ?? '/art/team-placeholder.png'}>
      <Box
        className="team-card-content"
        gap={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Link href={`${url}`} underline="none" color="inherit">
          <SecondarySmallHeaderText>{name}</SecondarySmallHeaderText>
          {description && (
            <ParagraphText sx={{ py: 1.25 }} fontSize={'0.75rem'}>
              {description}
            </ParagraphText>
          )}
        </Link>
        <SubdomainBox>
          <Link
            marginX={1}
            underline="none"
            href={`${PROTOCOL}://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CaptionText>{domain}</CaptionText>
          </Link>
        </SubdomainBox>
        <Box display="flex" gap={1}>
          {growth != null && (
            <IconBox
              Icon={SignalCellularAlt}
              text={`${growth}%`}
              color={'success'}
              href={`${url}/analytics`}
            />
          )}
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
