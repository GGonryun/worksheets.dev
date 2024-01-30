import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { QuestionAnswerSection } from '@worksheets/ui/components/qa-section';
import { useBookmark } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import React from 'react';

export const QuestionsSection: React.FC<{ faq: QuestionAnswer[] }> = ({
  faq,
}) => {
  const bookmark = useBookmark();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          gap: 4,
          p: { xs: 2, sm: 4 },
          color: 'text.arcade',
          backgroundColor: 'background.solid-blue',
        }}
      >
        <Typography
          sx={{
            typography: { xs: 'h5', sm: 'h4' },
          }}
          textAlign="center"
        >
          Frequently Asked Questions
        </Typography>
        <QuestionAnswerSection qa={faq} bookmark={bookmark} />
      </Paper>
    </Box>
  );
};
