import Container from '@mui/material/Container';
import { TitleSection } from './title-section';
import { SupportSection } from './support-section';
import { DevelopersSection } from './developers-section';
import { QuestionsSection } from './questions-section';
import { BasicWebsiteStatistics } from '@worksheets/util/types';

export interface ContributionScreenProps {
  statistics?: BasicWebsiteStatistics;
}

export function ContributionScreen(props: ContributionScreenProps) {
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
      <TitleSection statistics={props.statistics} />
      <DevelopersSection />
      <SupportSection />
      <QuestionsSection />
    </Container>
  );
}
