import { Container } from '@mui/material';
import {
  CharityCampaign,
  CharityOrganization,
  GamePopularityStatistics,
} from '@worksheets/util/types';
import urls from '@worksheets/util/urls';
import { FC } from 'react';

import { CampaignSection } from './campaign-section';
import { CharityDescription } from './charity-description';
import { StatisticsSection } from './statistics-section';
import { TitleSection } from './title-section';

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
      <CampaignSection
        charity={charity}
        pledge={pledge}
        statistics={statistics}
        pollUrl={pollUrl}
      />
      <StatisticsSection {...statistics} />
      <CharityDescription description={charity.description} />
    </Container>
  );
};
