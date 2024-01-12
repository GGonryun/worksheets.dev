import { Container, Paper, Typography } from '@mui/material';
import { QuestionAnswerSection } from '@worksheets/ui/qa-section';
import { QuestionAnswer } from '@worksheets/util/types';
import { FC } from 'react';

export type HelpScreenProps = {
  bookmark?: string;
  qa: QuestionAnswer[];
};

export const HelpScreen: FC<HelpScreenProps> = ({ bookmark, qa }) => {
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
          Get Involved
        </Typography>
        <Typography variant="body2" my={1}>
          Embark on a quest to raise money for charity by playing games, and
          help us spread the word. Whether you're a developer looking to add
          your game to our platform, or a player looking to help us spread the
          word, we'd love to hear from you!
        </Typography>
        <QuestionAnswerSection qa={qa} bookmark={bookmark} />
      </Paper>
    </Container>
  );
};
