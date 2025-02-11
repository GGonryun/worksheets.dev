'use client';

import { Notifications } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { emailRoutes, helpRoutes, portalRoutes } from '@worksheets/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { HelpAccountQuestions, SettingsPanels } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

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
          <Link href={portalRoutes.signUp.url()}>
            Create your account today!
          </Link>
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
            <Link href={portalRoutes.signUp.url()}>
              Create your account today!
            </Link>
          </ListItem>
          <ListItem>
            <Link href={portalRoutes.login.url()}>
              Already have an account? Log in here.
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={helpRoutes.accounts.path({
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
  {
    id: HelpAccountQuestions.Emails,
    question: 'What are the different types of Emails we send?',
    summary:
      'Charity Games sends emails to keep you informed about your account, rewards, and new games.',
    answer: (
      <Box>
        <Typography variant="body1">
          We never send spam emails. We only send emails to keep you informed
          about your account, rewards, and new games.
          <br />
          <br />
          There are two primary types of emails we send: Transactional and
          Marketing emails.
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          Transactional Emails
        </Typography>
        <Typography variant="body1" component="div">
          Transactional emails are only sent to let you know that something has
          happened with your account. For example, when you redeem a reward, we
          send you an email to confirm that you have redeemed the reward. Other
          reasons we send transactional emails include:
          <ul>
            <li>Account creation</li>
            <li>Redeeming a reward</li>
            <li>Winning a reward</li>
            <li>Getting a warning or a ban notice</li>
          </ul>
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          Marketing Emails
        </Typography>
        <Typography variant="body1">
          Marketing emails are sent to keep you informed about new games and
          promotions. We only send marketing emails to users who have opted in
          to receive them. Our newsletter includes updates about new games,
          rewards, tips & tricks, and promotions.
          <br />
          <br />
          You can unsubscribe from marketing emails at any time.{' '}
          <Link
            href={helpRoutes.accounts.url({
              bookmark: HelpAccountQuestions.Unsubscribing,
            })}
          >
            Learn how.
          </Link>
        </Typography>
      </Box>
    ),
  },
  {
    id: HelpAccountQuestions.Unsubscribing,
    question: 'How do I unsubscribe from Emails?',
    summary:
      'You can unsubscribe from marketing emails by clicking the unsubscribe link in the email.',
    answer: (
      <Box>
        You can unsubscribe from marketing emails by:
        <ul>
          <li>Clicking the unsubscribe link in the email you received.</li>
          <li>
            Going to your{' '}
            <Link
              href={portalRoutes.account.url({
                bookmark: SettingsPanels.Communication,
              })}
            >
              account's communications settings section
            </Link>
          </li>
          <li>
            Visiting our
            <Link href={portalRoutes.newsletter.unsubscribe.path()}>
              unsubscribe page
            </Link>
            and manually entering your email
          </li>
        </ul>
      </Box>
    ),
  },

  {
    id: HelpAccountQuestions.NotReceiving,
    question: 'Why am I not receiving Emails?',
    summary:
      'If you are not receiving emails, check your spam folder and update your email address.',
    answer: (
      <Box>
        If you are not receiving emails from Charity Games, there are a few
        things you can check:
        <ul>
          <li>
            Check your spam folder. Sometimes emails from us get marked as spam
            by your email provider.
          </li>
          <li>
            Add{' '}
            <Link href={`mailto:${emailRoutes.admin}`}>
              {emailRoutes.admin}
            </Link>{' '}
            to your email provider's safe sender list.
          </li>
          <li>
            Make sure your email address is up to date. You cannot edit your
            email address after you have created your account. If you need to
            change your email address, please{' '}
            <Link href={helpRoutes.contact.path()}>contact us</Link> directly.
          </li>
        </ul>
      </Box>
    ),
  },
  {
    id: HelpAccountQuestions.Notifications,
    question: 'What are notifications?',
    summary:
      'Notifications are messages that are sent to you when something happens on the platform. For example, when you win a prize or if a referral signs up.',
    answer: (
      <Box>
        <Typography>
          Notifications are messages that are sent to you when something happens
          on the platform. For example, when you win a prize or if a referral
          signs up.
          <br />
          <br />
          We send both in-app and email notifications. More notification
          providers will be added in the future. You can manage your
          notifications in your account settings.
        </Typography>
        <br />
        <Typography variant="h6">Prize Notifications</Typography>
        <OrderedList>
          <ListItem>When you win a prize</ListItem>
          <ListItem>When a referral signs up</ListItem>
          <ListItem>When you find a gift box while playing a game.</ListItem>
          <ListItem>When someone starts following you.</ListItem>
        </OrderedList>
        <HelpfulLinks
          links={[
            {
              text: 'See my notifications',
              href: portalRoutes.account.notifications.path(),
            },
            {
              text: 'Change my notification settings',
              href: portalRoutes.account.path({
                bookmark: SettingsPanels.Communication,
              }),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpAccountQuestions.ViewingNotifications,
    question: 'How do I see my notifications?',
    summary: 'You can see your notifications by clicking on the bell icon.',
    answer: (
      <Box>
        <Typography>
          You must be logged in to see your notifications.
          <br />
          <br />
          You can see your notifications by clicking on the bell icon (
          <Notifications fontSize="small" sx={{ mb: -0.5 }} />) in the top right
          corner of the screen.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'See my notifications',
              href: portalRoutes.account.notifications.path(),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpAccountQuestions.DisablingNotifications,
    question: 'How do I turn off notifications?',
    summary: 'You can manage your notifications in your account settings.',
    answer: (
      <Box>
        <Typography>
          <b>
            This feature is currently not enabled, only mandatory notifications
            are being sent to users. We will enable this feature in the future.
          </b>
          <br />
          <br />
          You can manage your notifications in your account settings.
          <br />
          <br />
          You can turn off notifications for specific events or completely turn
          off notifications.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'Change my notification settings',
              href: portalRoutes.account.path({
                bookmark: SettingsPanels.Communication,
              }),
            },
          ]}
        />
      </Box>
    ),
  },
];
