import Box from '@mui/material/Box';
import { QuestionAnswer } from '@worksheets/util/types';
import { FC, useEffect, useState } from 'react';

import { QuestionAnswerBox } from './qa-box';
import { StickyContactBox } from './sticky-contact-box';

export type QuestionAnswerSectionProps = {
  qa: QuestionAnswer[];
  bookmark: string | undefined;
  hideFAQRedirect?: boolean;
};

export const QuestionAnswerSection: FC<QuestionAnswerSectionProps> = ({
  qa,
  bookmark,
  hideFAQRedirect,
}) => {
  const [open, setOpen] = useState<string | undefined>(bookmark);

  useEffect(() => {
    if (bookmark) {
      setOpen(bookmark);
    }
  }, [bookmark]);

  return (
    <Box
      sx={{
        my: 2,
        display: 'grid',
        gridTemplateColumns: { xs: '100%', sm: '60% 30%' },
        justifyContent: 'space-around',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {qa.map(({ question, answer, id }, index) => (
          <QuestionAnswerBox
            key={index}
            id={id}
            open={open === id}
            onOpen={() => setOpen(id === open ? undefined : id)}
            question={question}
            answer={answer}
          />
        ))}
      </Box>
      <StickyContactBox hideFAQRedirect={hideFAQRedirect} />
    </Box>
  );
};
