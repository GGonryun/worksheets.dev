import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Questions } from '@worksheets/ui/components/qa-section';
import { GradientTypography } from '@worksheets/ui/components/typography';
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
          background: (theme) => theme.palette.background['soft'],
        }}
      >
        <GradientTypography
          textAlign="center"
          typography={{ xs: 'h5', sm: 'h4' }}
          background={(theme) =>
            theme.palette.text.marketing.gradients.blue.dark
          }
        >
          Frequently Asked Questions
        </GradientTypography>
        <Questions qa={faq} bookmark={bookmark} />
      </Paper>
    </Box>
  );
};
