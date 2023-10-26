import { Link, LinkProps } from '@mui/material';
import { FC, ReactNode } from 'react';
import { urls } from '../../util';

export type WebsiteLinkProps = {
  sx?: LinkProps['sx'];
};

export const FreeRiceLink = () => (
  <Link href={urls.freeRice()} target="_blank" rel="noreferrer">
    FreeRice.com
  </Link>
);

export const CharityWaterLink = () => (
  <Link href={urls.charityWater()} target="_blank" rel="noreferrer">
    Charity: Water
  </Link>
);

export const WaterOrgLink: FC<WebsiteLinkProps> = ({ sx }) => (
  <Link href={urls.waterOrg()} target="_blank" rel="noreferrer" sx={sx}>
    Water.org
  </Link>
);

export const FullStoryLink = () => (
  <Link href={urls.fullstory()} target="_blank" rel="noreferrer">
    FullStory
  </Link>
);

export const CharityGamesLink = () => (
  <Link href={urls.charityGames.home()}>Charity.Games</Link>
);

export const WorksheetsLink = () => (
  <Link href={urls.worksheets()}>Worksheets.dev</Link>
);

export const ContactLink: FC<{ children: ReactNode }> = ({ children }) => (
  <Link href={urls.charityGames.contact()}>{children}</Link>
);

export const SubscribeLink: FC<{ children: ReactNode }> = ({ children }) => (
  <Link href={urls.charityGames.newsletter()}>{children}</Link>
);
