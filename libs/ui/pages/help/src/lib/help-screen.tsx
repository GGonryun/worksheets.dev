import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { QuestionAnswerSection } from '@worksheets/ui/components/qa-section';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { useBookmark } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import { FC } from 'react';

export type HelpScreenProps = {
  title: string;
  description: string;
  qa: QuestionAnswer[];
};

export const HelpScreen: FC<HelpScreenProps> = ({ title, description, qa }) => {
  const bookmark = useBookmark();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          background: (theme) => theme.palette.background['gradient-blue'],
          color: 'text.arcade',
        }}
      >
        <Button
          variant="arcade"
          color="warning"
          size="small"
          startIcon={<KeyboardBackspace />}
          href="/help"
          sx={{
            width: 'fit-content',
            mb: 2,
          }}
        >
          Back to Help Center
        </Button>
        <Typography
          typography={{
            xs: 'h5',
            sm: 'h4',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" my={1}>
          {description}
        </Typography>
        {qa.length ? (
          <QuestionAnswerSection qa={qa} bookmark={bookmark} />
        ) : (
          <Box mt={8}>
            <UnderConstruction />
          </Box>
        )}
      </Paper>
    </Container>
  );
};
