import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  Container,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ChevronRight } from '@mui/icons-material';
import { Markdown } from '@worksheets/ui-core';

export type HelpScreenProps = {
  defaultOpen?: string;
  qa: { question: string; answer: string; id: string }[];
};

export const HelpScreen: FC<HelpScreenProps> = ({ defaultOpen, qa }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
          }}
        >
          Get Involved
        </Typography>
        <Typography variant="body2" my={1}>
          Embark on a quest to raise money for charity by playing games, and
          help us spread the word. Whether you're a developer looking to add
          your game to our platform, or a player looking to help us spread the
          word, we'd love to hear from you!
        </Typography>
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
                open={defaultOpen === id}
                question={question}
                answer={answer}
              />
            ))}
          </Box>
          <Box
            sx={{
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
              color="black"
              sx={{
                backgroundColor: (theme) => theme.palette.grey[700],
                borderRadius: 8,
                mt: 2,
                textTransform: 'none',
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
        <Link href="/faq" mt={1}>
          <Typography
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

const QuestionAnswerBox: FC<{
  open?: boolean;
  question: string;
  answer: string;
}> = ({ open: defaultOpen, question, answer }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(defaultOpen ?? false);
  }, [defaultOpen]);

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <ButtonBase
        onClick={() => setOpen((o) => !o)}
        sx={{
          p: 2,
          display: 'flex',
          width: '100%',
          pr: 1,
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" textAlign="left">
          {question}
        </Typography>
        <ChevronRight />
      </ButtonBase>
      <Collapse in={open}>
        <Typography
          component="div"
          variant="body2"
          whiteSpace="pre-line"
          m={2}
          mt={0}
        >
          <Markdown text={answer} />
        </Typography>
      </Collapse>
    </Box>
  );
};
