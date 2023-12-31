import Box, { BoxProps } from '@mui/material/Box';
import { FC, useEffect, useState } from 'react';
import { QuestionAnswerBox } from './qa-box';
import { QuestionAnswer } from '@worksheets/util/types';
import { StickyContactBox } from './sticky-contact-box';

export type QuestionAnswerSectionProps = {
  qa: QuestionAnswer[];
  bookmark: string | undefined;
  hideFAQRedirect?: boolean;
  markdownSx?: BoxProps['sx'];
};

export const QuestionAnswerSection: FC<QuestionAnswerSectionProps> = ({
  qa,
  bookmark,
  hideFAQRedirect,
  markdownSx,
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
            markdownSx={markdownSx}
          />
        ))}
      </Box>
      <StickyContactBox hideFAQRedirect={hideFAQRedirect} />
    </Box>
  );
};
