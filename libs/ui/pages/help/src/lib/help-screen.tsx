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
import { FC, useState } from 'react';
import { ChevronRight } from '@mui/icons-material';
import { Markdown } from '@worksheets/ui-core';
import urls from '@worksheets/util/urls';

export type HelpScreenProps = {
  // no props
};

const qa = [
  {
    question: "I'm a developer. How can I help?",
    answer: `We're glad you asked! As a developer, you can help us in a number of ways:
      - Add your game to our platform. We're always looking for new games to add to our platform. If you have a game that you'd like to add, please [contact us](/contact).
      - Help us improve our platform. We're always looking for ways to improve our platform. If you have any suggestions, please [contact us](/contact).
      - Help us fix bugs. If you find a bug, please file a bug report on our [GitHub repository](${urls.social.github}).`,
  },

  {
    question: "I'm a player. How can I help?",
    answer: `We're glad you asked! As a player, you can help us in a number of ways:
      - Play games on our platform. The more games you play, the more money we can raise for charity.
      - Help us spread the word. The more people that know about our platform, the more money we can raise for charity. If you have a following on social media, please consider sharing our platform with your followers.
      - Share your feedback. We're always looking for ways to improve our platform. If you have any suggestions, please [contact us](/contact).`,
  },
  {
    question: "I'm a teacher. How can I help?",
    answer: `We're glad you asked!

    As a teacher, we'd like to **help you** raise money for your school and your classroom.

    Teachers are eligible for our referral program. You will receive an affiliate link so all funds raised by your students will be credited to you classroom or your school. Please [contact us](/contact) for more information.

    Teachers are also eligible for our ambassador program. You will receive a free shirt and other perks for your classroom. Please [contact us](/contact) for more information.
    
    We're also looking for teachers to help us create educational content for our website. If you're interested, please [contact us](/contact).`,
  },
  {
    question: "I'm a charity. How can I help?",
    answer: `We'd love to have you on our platform! Please [contact us](/contact) for more information.

    As a charity organization, we'd like to help you raise money for your cause. We're looking for charities to feature on our platform.

    Charities are eligible for our referral program. You will receive an affiliate link so all funds raised by your supporters will be credited to your charity. Please [contact us](/contact) for more information.`,
  },
  {
    question: "I'm a content creator. How can I help?",
    answer: `We're glad you asked! As a content creator, you can help us in a number of ways:
    - Promote our platform on your stream. We have a number of assets that you can use to promote our platform on your stream. Please [contact us](/contact) for more information.
    - Help us spread the word. The more people that know about our platform, the more money we can raise for charity. If you have a following on social media, please consider sharing our platform with your followers.
    - All content creator get a free shirt if they raise at least $100 for charity. Please [contact us](/contact) to learn more!`,
  },
  {
    question: "I'm a professional. How can I help?",
    answer: `We're glad you asked! Depending on what skills you have, you can help us in a number of ways:
    - If you're a graphic designer, you can help us design our website and marketing materials.
    - If you're a web developer, you can help us improve our platform.
    - If you're a lawyer, you can help us with our legal documents.
    - If you're a marketer, you can help us promote our platform.
    - If you're a writer, you can help us create content for our website.
    - If you're a professional in another field, we still need your help! Please [contact us](/contact) and we'll find a way for you to help.`,
  },
  {
    question: "I'm a student. How can I help?",
    answer: `You should be focusing on your studies! But if you have some free time, you can help us in a number of ways:
    - Depending on what skills you have, you can help us in the same ways that professionals can help us. See the answer to the previous question for more information.
    - If you're a student in a computer science program, you can help us add new games to our platform.
    - If you can promote our platform on your campus, you can help us spread the word. 
    - If you want to become a campus ambassador, please [contact us](/contact) for a free shirt and other perks.`,
  },
  {
    question: "I'm a parent. How can I help?",
    answer: `We're glad you asked! As a parent, you can help us in a number of ways:
    - If you have a child that's a student, you can encourage them to help us. See the answer to the previous question for more information.
    - If you want to become an ambassador for your child's school, please [contact us](/contact) for a free shirt and other perks.
    - If you are a professional, you can help us in the same ways that professionals can help us. See the answer to the question about professionals for more information.
    - If you have a child with a disability, you can help us improve our platform. Please [contact us](/contact) for more information.`,
  },
  {
    question: "I'm a sponsor. How can I help?",
    answer: `We're glad you asked! As a sponsor, you can help us in a number of ways:
    - Donate money to our current campaign. You can make direct contributions to our current campaign [here](/charity) or you can donate to our charity of the month [here](/charity).
    - Tell your friends about us. The more people that know about our platform, the more money we can raise for charity. If you have a following on social media, please consider sharing our platform with your followers.
    - Sponsor our platform. We're always looking for sponsors to help us cover our operating costs. If you're interested in sponsoring our platform, please [contact us](/contact).`,
  },

  {
    question: 'I have a lot of money. How can I help?',
    answer: `We're glad you asked! As a wealthy individual, you can help us in a number of ways:
    - Donate money to our current campaign. You can make direct contributions to our current campaign [here](/charity) or you can donate to our charity of the month [here](/charity).
    - Tell your millionaire buddies about us. The more people that know about our platform, the more money we can raise for charity. If you have a following on social media, please consider sharing our platform with your followers.
    - Sponsor our platform. We're always looking for sponsors to help us cover our operating costs. If you're interested in sponsoring our platform, please [contact us](/contact).`,
  },
];

export const HelpScreen: FC<HelpScreenProps> = () => {
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
            {qa.map(({ question, answer }, index) => (
              <QuestionAnswerBox
                key={index}
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

const QuestionAnswerBox: FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [open, setOpen] = useState(false);
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
