import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { QuestionAnswerSection } from '@worksheets/ui/qa-section';
import { useEventListener } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { TitleText } from './title-text';

export const QuestionsSection: React.FC<{ faq: QuestionAnswer[] }> = ({
  faq,
}) => {
  const { asPath } = useRouter();
  const [bookmark, setBookmark] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (asPath.includes('#')) {
      setBookmark(asPath.split('#')[1]);
    }
  }, [asPath]);

  // when the hash changes, update the bookmark state to the new hash
  // TODO: verify if this is needed and if it works on all browsers
  useEventListener('hashchange', (event) => {
    if (event.newURL.includes('#')) {
      setBookmark(event.newURL.split('#')[1]);
    }
  });

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
        <QuestionAnswerSection qa={faq} bookmark={bookmark} />
      </Paper>
    </Box>
  );
};
