import { ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  Collapse,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { helpFaq } from '@worksheets/ui/components/qa-section';
import { GradientTypography } from '@worksheets/ui/components/typography';
import { QuestionAnswer } from '@worksheets/util/types';
import React from 'react';

import { deepDropShadow } from '../style';

export const RulesSection = () => (
  <Box
    sx={{
      position: 'relative',
      py: 14,
      background: (theme) => theme.palette.background.soft,
      borderRadius: (theme) => theme.shape.borderRadius * 2,
      boxShadow: deepDropShadow,
      zIndex: 6,
    }}
  >
    <Container
      component={Box}
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        gap: { xs: 6, sm: 8 },
      }}
    >
      <GradientTypography
        textAlign={{ xs: 'center', sm: 'left' }}
        typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
        letterSpacing={{ xs: 1, sm: 2, md: 3 }}
        background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
      >
        Frequently Asked Questions
      </GradientTypography>
      <Questions qa={helpFaq} />
    </Container>
    <Artwork />
  </Box>
);

const Questions: React.FC<{
  qa: QuestionAnswer[];
}> = ({ qa }) => (
  <Box display="flex" gap={6} flexDirection="column">
    {qa.map((qa, index) => (
      <Question key={index} question={qa.question} answer={qa.answer} />
    ))}
  </Box>
);

const Question: React.FC<{
  question: string;
  answer: React.ReactNode;
}> = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  const spacing = { xs: 2, sm: 4 };
  return (
    <Box display="flex" flexDirection="row" gap={{ xs: 2, sm: 4 }}>
      <QuestionLine component={Link} onClick={() => setOpen(!open)} />
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
        <Box
          component={Link}
          onClick={() => setOpen(!open)}
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
            color: (theme) => theme.palette.text.blue.light,
            '& p': {
              fontWeight: 500,
            },
          }}
        >
          {answer}
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

const Artwork = () => (
  <>
    <GiftsLeft />
    <GiftsRight />
  </>
);

const IMAGE_HEIGHT = {
  xs: 200,
  mobile1: 250,
  mobile2: 300,
  sm: 350,
  md: 400,
  lg: 450,
  xl: 550,
};
const GiftsLeft = () => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 5,
      aspectRatio: '285/714',
      height: IMAGE_HEIGHT,
      left: 0,
      bottom: { xs: -100, mobile1: -120, sm: -180, lg: -200, xl: -250 },
    }}
  >
    <FillImage src="/marketing/gifts-2-left.png" alt="gifts" priority />
  </Box>
);

const GiftsRight = () => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 5,
      aspectRatio: '396/721',
      height: IMAGE_HEIGHT,
      right: 0,
      top: { xs: -125, mobile1: -150, sm: -250 },
    }}
  >
    <FillImage src="/marketing/gifts-2-right.png" alt="gifts" priority />
  </Box>
);
