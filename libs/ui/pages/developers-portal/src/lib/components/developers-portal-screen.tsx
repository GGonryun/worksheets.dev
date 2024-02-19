import Container from '@mui/material/Container';
import {
  BasicWebsiteStatistics,
  DeveloperSchema,
  QuestionAnswer,
} from '@worksheets/util/types';

import { DevelopersSection } from './developers-section';
import { QuestionsSection } from './questions-section';
import { SupportSection } from './support-section';
import { TitleSection } from './title-section';

export interface DevelopersPortalScreenProps {
  statistics?: BasicWebsiteStatistics;
  developers: DeveloperSchema[];
  faq: QuestionAnswer[];
}

export function DevelopersPortalScreen(props: DevelopersPortalScreenProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <TitleSection statistics={props.statistics} />
      <DevelopersSection developers={props.developers} />
      <SupportSection />
      <QuestionsSection faq={props.faq} />
    </Container>
  );
}
