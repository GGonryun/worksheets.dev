import { Box } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { helpPrizeWall } from '@worksheets/ui/components/help';
import { Questions } from '@worksheets/ui/components/qa-section';
import { useBookmark } from '@worksheets/ui-core';
import React from 'react';

export const FrequentlyAskedQuestions: React.FC = () => {
  const bookmark = useBookmark();
  return (
    <Description
      title="Frequently Asked Questions"
      color="secondary"
      description={
        <Box mt={{ xs: 3, sm: 4 }}>
          <Questions qa={helpPrizeWall} bookmark={bookmark} />
        </Box>
      }
    />
  );
};
