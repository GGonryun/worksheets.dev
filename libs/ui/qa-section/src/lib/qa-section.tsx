import Box, { BoxProps } from '@mui/material/Box';
import { FC, useEffect, useState } from 'react';
import { QuestionAnswerBox } from './qa-box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export type QuestionAnswer = { question: string; answer: string; id: string };

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
      <Box
        sx={{
          position: { xs: 'block', sm: 'sticky' },
          top: 80,
          bottom: 0,
          height: 'fit-content',
          paddingLeft: { xs: 0, sm: 2 },
          borderLeft: (theme) => ({
            xs: 'none',
            sm: `3px solid ${theme.palette.divider}`,
          }),
        }}
      >
        <Typography variant="body2">
          Don't see your question here? Ask us anything, we're here to help!
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 8,
            mt: 2,
            textTransform: 'none',
            fontWeight: 700,
            fontFamily: (theme) => theme.typography.body1.fontFamily,
          }}
        >
          Contact Us
        </Button>
        {!hideFAQRedirect && (
          <Link href="/faq">
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Link>
        )}
      </Box>
    </Box>
  );
};
