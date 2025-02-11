'use client';

import { ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Link,
  Typography,
} from '@mui/material';
import { helpRoutes } from '@worksheets/routes';
import { BookmarkAnchor } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import React, { useEffect, useState } from 'react';

export const Questions: React.FC<{
  qa: QuestionAnswer[];
  bookmark?: string;
  gap?: number;
  hideContact?: boolean;
}> = ({ qa, bookmark, gap = 6, hideContact }) => {
  const [open, setOpen] = useState<string | undefined>(bookmark);

  useEffect(() => {
    if (bookmark) {
      setOpen(bookmark);
    }
  }, [bookmark]);

  return (
    <Box display="flex" gap={gap} flexDirection="column">
      {qa.map((qa, index) => (
        <Question
          key={index}
          id={qa.id}
          open={open === qa.id}
          onClick={() => setOpen(qa.id === open ? undefined : qa.id)}
          question={qa.question}
          answer={qa.answer}
        />
      ))}
      {!hideContact && (
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography
            typography={{ xs: 'body2', sm: 'body1' }}
            color={(theme) => theme.palette.text.blue.main}
            fontWeight={{ xs: 500, sm: 500 }}
          >
            Need more help? Contact us!
          </Typography>
          <Button
            variant="arcade"
            color="success"
            size="small"
            href={helpRoutes.contact.url()}
            sx={{
              width: 'fit-content',
            }}
          >
            Contact Us
          </Button>
        </Box>
      )}
    </Box>
  );
};

const Question: React.FC<{
  id: string;
  open: boolean;
  onClick: () => void;
  question: string;
  answer: React.ReactNode;
}> = ({ question, answer, open, id, onClick }) => {
  const spacing = { xs: 2, sm: 4 };
  return (
    <Box display="flex" flexDirection="row" gap={{ xs: 2, sm: 4 }}>
      <QuestionLine component={Link} onClick={() => onClick()} />
      <Box
        width="100%"
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          background: (theme) =>
            open
              ? theme.palette.background.marketing.gradients.blue.transparent
              : undefined,
          pb: open ? spacing : undefined,
        }}
      >
        <BookmarkAnchor id={id} />
        <Box
          component={Link}
          onClick={onClick}
          display="flex"
          justifyContent="space-between"
          underline="none"
          alignItems="center"
          sx={{
            py: open ? spacing : 0,
            px: spacing,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          <Typography
            typography={{ xs: 'h6', sm: 'h5' }}
            fontWeight={{
              xs: 800,
              sm: 800,
              md: 800,
            }}
            color={(theme) => theme.palette.text.blue.dark}
          >
            {question}
          </Typography>
          <ArrowDropDown
            fontSize="large"
            sx={{
              color: (theme) => theme.palette.text.blue.dark,
            }}
          />
        </Box>
        <Collapse
          in={open}
          sx={{
            px: spacing,
            color: (theme) => theme.palette.text.blue.dark,
          }}
        >
          <Typography
            component={'div'}
            sx={{
              fontWeight: 500,
              '& p': {
                fontWeight: 500,
              },
            }}
          >
            {answer}
          </Typography>
        </Collapse>
      </Box>
    </Box>
  );
};

const QuestionLine: React.FC<Omit<BoxProps, 'sx'>> = (props) => (
  <Box
    {...props}
    sx={{
      cursor: 'pointer',
      width: 6,
      borderRadius: '2px',
      background: (theme) => theme.palette.primary.gradient,
    }}
  />
);
