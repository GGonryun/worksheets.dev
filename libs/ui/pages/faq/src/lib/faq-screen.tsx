import { Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { QuestionAnswerSection } from '@worksheets/ui/qa-section';
import { QuestionAnswer } from '@worksheets/util/types';

export type FAQScreenProps = {
  bookmark: string | undefined;
  faq: QuestionAnswer[];
};

export const FAQScreen: FC<FAQScreenProps> = ({ faq, bookmark }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="body2" my={1}>
          Get the answers to the most common questions about Charity Games.
        </Typography>
        <QuestionAnswerSection hideFAQRedirect qa={faq} bookmark={bookmark} />
      </Paper>
    </Container>
  );
};
