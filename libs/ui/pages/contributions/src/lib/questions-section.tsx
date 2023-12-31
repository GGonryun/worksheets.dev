import Paper from '@mui/material/Paper';
import { TitleText } from './title-text';
import Box from '@mui/material/Box';
import { QuestionAnswerSection } from '@worksheets/ui/qa-section';
import { useRouter } from 'next/router';
import { contributionFaq } from '@worksheets/data-access/charity-games';
import { useEffect, useState } from 'react';

export const QuestionsSection = () => {
  const { asPath } = useRouter();
  const [bookmark, setBookmark] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (asPath.includes('#')) {
      setBookmark(asPath.split('#')[1]);
    }
  }, [asPath]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          gap: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <TitleText variant="h2" textAlign="center">
          Frequently Asked Questions
        </TitleText>
        <QuestionAnswerSection
          qa={contributionFaq}
          bookmark={bookmark}
          markdownSx={{
            whiteSpace: 'normal',
            p: {
              margin: 0,
              padding: 0,
            },
          }}
        />
      </Paper>
    </Box>
  );
};
