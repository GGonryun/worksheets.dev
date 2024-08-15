import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { HelpAccountQuestions } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

export const helpAccounts: QuestionAnswer[] = [
  {
    id: HelpAccountQuestions.AccountRequired,
    question: 'Do I need an account?',
    summary: `Creating a Charity.Games account unlocks several important features. You can win prizes, participate in raffles and giveaways, save your favorite games, earn achievements, vote on games and charities, compete on leaderboards, events, and tournaments, and submit games to our platform. You can play all of our games without an account, but you won't be able to do any of the above.`,
    answer: (
      <Box>
        <Typography>
          Creating a Charity.Games account unlocks several important features.
          You can:
        </Typography>
        <OrderedList>
          <ListItem>Start earning tokens for prizes.</ListItem>
          <ListItem>Participate in raffles and giveaways.</ListItem>
          <ListItem>Participate in boss battles.</ListItem>
          <ListItem>Save your favorite games.</ListItem>
          <ListItem>Earn achievements.</ListItem>
          <ListItem>Vote on games and charities.</ListItem>
          <ListItem>Compete on leaderboards, events, and tournaments.</ListItem>
          <ListItem>Submit games to our platform.</ListItem>
        </OrderedList>
        <br />
        <Typography>
          You can play all of our games without an account, but you won't be
          able to do any of the above.
          <br />
          <br />
          <Link href={routes.signUp.path()}>Create your account today!</Link>
        </Typography>
      </Box>
    ),
  },
  {
    id: HelpAccountQuestions.AccountCreation,
    question: 'How do I create an account?',
    summary: `You can create an account by clicking the "Sign Up" button in the top right corner of the screen. You can also click the "Sign Up" button on the login screen.`,
    answer: (
      <Box>
        <Typography gutterBottom>
          You can create an account by clicking the "Login/Sign Up" button in
          the top right corner of the screen.
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          Helpful Links:
        </Typography>
        <OrderedList>
          <ListItem>
            <Link href={routes.signUp.path()}>Create your account today!</Link>
          </ListItem>
          <ListItem>
            <Link href={routes.login.path()}>
              Already have an account? Log in here.
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={routes.help.accounts.path({
                bookmark: HelpAccountQuestions.AccountRequired,
              })}
            >
              Why do I need an account?
            </Link>
          </ListItem>
        </OrderedList>
        <Typography></Typography>
      </Box>
    ),
  },
  {
    id: HelpAccountQuestions.ValidUsernames,
    question: 'What are valid usernames?',
    summary: `Your username must be unique and between 3 and 20 characters long. It can only contain letters, numbers, and underscores.`,
    answer: (
      <Typography>
        Your username must be unique and between 3 and 20 characters long. It
        can only contain letters, numbers, and underscores.
        <br />
        <br />
        No spaces or special characters are allowed
        <br />
        <br />
        Your name cannot include a protected word or phrase, such as "admin" or
        "moderator".
      </Typography>
    ),
  },
];
