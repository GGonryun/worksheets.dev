import Container from '@mui/material/Container';
import { BasicWebsiteStatistics, QuestionAnswer } from '@worksheets/util/types';

import { DevelopersSection } from './developers-section';
import { QuestionsSection } from './questions-section';
import { SupportSection } from './support-section';
import { TitleSection } from './title-section';

export interface ContributionScreenProps {
  statistics?: BasicWebsiteStatistics;
  faq: QuestionAnswer[];
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
      <QuestionsSection faq={props.faq} />
    </Container>
  );
}
