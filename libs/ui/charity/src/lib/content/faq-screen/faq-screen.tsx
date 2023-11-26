import { Box, Container, Link, Paper, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Markdown } from '../../typography';
import { AnimatePresence, motion } from 'framer-motion';
import { qa } from './qa';

export type FAQScreenProps = {
  // no props
};

export const FAQScreen: FC<FAQScreenProps> = (props) => {
  const [openTableOfContents, setShowTableOfContents] = useState(true);

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
        <Typography variant="h4">Frequently Asked Questions</Typography>
        <Box
          sx={{
            my: 2,
            border: (theme) => `1px solid ${theme.palette.grey[500]}`,
          }}
        >
          <Box
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[500]}`,
              margin: '-1px',
              px: 1,
              py: 0.5,
              backgroundColor: (theme) => theme.palette.grey[200],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" lineHeight={1.25}>
              Table of Contents
            </Typography>
            <Typography variant="body3">
              <Link
                onClick={() => setShowTableOfContents(!openTableOfContents)}
                color="inherit"
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                {openTableOfContents ? '[hide]' : '[show]'}
              </Link>
            </Typography>
          </Box>
          <AnimatePresence>
            {openTableOfContents && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Box px={2} py={1}>
                  {qa.map((d) => (
                    <Typography
                      component="li"
                      key={d.id}
                      sx={{
                        marginLeft: '0rem',
                      }}
                    >
                      <Link color="primary.main" href={'#' + d.id}>
                        {d.question}
                      </Link>
                    </Typography>
                  ))}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {qa.map((d) => (
            <QuestionAnswerBox
              key={d.id}
              question={d.question}
              answer={d.answer}
              id={d.id}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

const QuestionAnswerBox: FC<{
  question: string;
  answer: string;
  id: string;
}> = ({ id, question, answer }) => (
  <Box>
    <Typography variant="h6" id={id}>
      <Link
        color="inherit"
        href={'#' + id}
        underline="hover"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {question}
      </Link>
    </Typography>
    <Typography>
      <Markdown
        text={answer}
        sx={{
          a: {
            color: (theme) => theme.palette.primary.main,
            textDecoration: 'underline',
            textDecorationColor: (theme) => theme.palette.primary.main,
          },
          'a:visited': {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      />
    </Typography>
  </Box>
);
