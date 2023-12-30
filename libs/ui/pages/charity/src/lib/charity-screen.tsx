import { Container } from '@mui/material';
import { FC } from 'react';
import { CampaignSection } from './campaign-section';
import { TitleSection } from './title-section';
import { StatisticsSection } from './statistics-section';
import { CharityDescription } from './charity-description';
import {
  CharityCampaign,
  CharityOrganization,
  GamePopularityStatistics,
} from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

export type CharityScreenProps = {
  charity: CharityOrganization;
  pledge: CharityCampaign['pledge'];
  statistics?: GamePopularityStatistics;
};

export const CharityScreen: FC<CharityScreenProps> = ({
  charity,
  pledge,
  statistics,
}) => {
  const pollUrl = urls.poll;
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TitleSection />
      <CampaignSection charity={charity} pledge={pledge} pollUrl={pollUrl} />
      <StatisticsSection {...statistics} />
      <CharityDescription description={charity.description} />
    </Container>
  );
};
