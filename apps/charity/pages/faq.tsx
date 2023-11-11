import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Box, Container, Link } from '@mui/material';
import {
  HeaderText,
  SmallHeaderText,
  ParagraphText,
} from '../components/Typography';
import { FC, useState } from 'react';
import { urls } from '@worksheets/ui-games';
import { MicroMarkdown } from '@worksheets/ui-core';
import { AnimatePresence, motion } from 'framer-motion';

const QuestionAnswerBox: FC<{
  question: string;
  answer: string;
  id: string;
}> = ({ id, question, answer }) => (
  <Box>
    <SmallHeaderText id={id}>
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
    </SmallHeaderText>
    <ParagraphText>
      <MicroMarkdown
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
    </ParagraphText>
  </Box>
);

const qa = [
  {
    question: 'How do you make money?',
    answer:
      "We don't. We're a non-profit organization. We're broke. Please donate, but not to us because we don't have a bank account. Donate to our charity of choice, [Water.org](https://Water.org)",
    id: 'how-do-you-make-money',
  },
  {
    question: 'How can I help?',
    answer:
      'You can help by donating, volunteering, or spreading the word about our organization.',
    id: 'how-can-i-help',
  },
  {
    question: "What's your mission?",
    answer:
      'We want to make the world a better place by using video games to raise money for charity.',
    id: 'whats-your-mission',
  },
  {
    question: 'Why was this organization created?',
    answer:
      'This organization was created to help people in need. We wanted to use the skills we have to make an impact.',
    id: 'why-was-this-organization-created',
  },
  {
    question: 'Who runs Charity.Games?',
    answer:
      'Charity.Games is run by volunteers. Currently there is no paid staff and we have 1 volunteer. Your feedback is greatly appreciated.',
    id: 'who-runs-charity-games',
  },
  {
    question: 'I found a bug, what should I do?',
    answer: `Please report it to us on our [GitHub](${urls.social.github}) page. Or visit our [Contact](${urls.relative.contact}) page to submit an email or join our Discord.`,
    id: 'i-found-a-bug-what-should-i-do',
  },
  {
    question: 'Do I need an account?',
    answer: `An account lets you submit games to our platform. In the near future we'll be adding support for commenting, following, and creating lists of your favorite games.`,
    id: 'do-i-need-an-account',
  },
];

const Page: NextPageWithLayout = () => {
  const [openTableOfContents, setShowTableOfContents] = useState(true);
  return (
    <Container
      sx={{
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <HeaderText>Frequently Asked Questions</HeaderText>
      <Box
        sx={{
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
            justifyContent: 'space-between',
          }}
        >
          <ParagraphText>Table of Contents</ParagraphText>
          <ParagraphText>
            <Link
              onClick={() => setShowTableOfContents(!openTableOfContents)}
              color="inherit"
              underline="hover"
              sx={{ cursor: 'pointer' }}
            >
              {openTableOfContents ? '[hide]' : '[show]'}
            </Link>
          </ParagraphText>
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
                  <ParagraphText
                    key={d.id}
                    sx={{
                      display: 'list-item',
                      marginLeft: '1rem',
                    }}
                  >
                    <Link color="primary.main" href={'#' + d.id}>
                      {d.question}
                    </Link>
                  </ParagraphText>
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
    </Container>
  );
};

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
