import Container from '@mui/material/Container';
import {
  BasicWebsiteStatistics,
  QuestionAnswer,
  TeamSchema,
} from '@worksheets/util/types';

import { DevelopersSection } from './developers-section';
import { QuestionsSection } from './questions-section';
import { SupportSection } from './support-section';
import { TitleSection } from './title-section';

export interface DevelopersPortalScreenProps {
  statistics?: BasicWebsiteStatistics;
  teams: TeamSchema[];
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
      <DevelopersSection teams={props.teams} />
      <SupportSection />
      <QuestionsSection faq={props.faq} />
    </Container>
  );
}
