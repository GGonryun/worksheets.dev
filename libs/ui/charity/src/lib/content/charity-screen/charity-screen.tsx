import { Container } from '@mui/material';
import { FC } from 'react';
import { CampaignSection } from './campaign-section';
import { TitleSection } from './title-section';
import { StatisticsSection } from './statistics-section';

export type CharityScreenProps = {
  pollUrl: string;
  charity: {
    imageUrl: string;
    name: string;
    description: string;
    url: string;
    category: string;
  };
  pledge: {
    required: number;
    current: number;
    games: number;
    players: number;
  };
  statistics: {
    countries: { name: string; hours: number }[];
    games: { id: string; name: string; plays: number }[];
    players: { new: number; returning: number };
  };
};

export const CharityScreen: FC<CharityScreenProps> = ({
  pollUrl,
  charity,
  pledge,
  statistics,
}) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
      }}
    >
      <TitleSection pollUrl={pollUrl} />
      <CampaignSection charity={charity} pledge={pledge} pollUrl={pollUrl} />
      <StatisticsSection {...statistics} />
    </Container>
  );
};
