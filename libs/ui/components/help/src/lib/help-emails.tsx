import { Box, Link, Typography } from '@mui/material';
import { emailRoutes, routes } from '@worksheets/routes';
import { HelpEmailsQuestions } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

export const helpEmails: QuestionAnswer[] = [
  {
    id: HelpEmailsQuestions.Description,
    question: 'What are the different types of Emails we send?',
    summary:
      'Charity Games only sends emails to keep you informed about your account, rewards, and new games.',
    answer: (
      <Box>
        <Typography variant="body1">
          We never send spam emails. We only send emails to keep you informed
          about your account, rewards, and new games.
        </Typography>
        <br />
        <Typography variant="h6" gutterBottom>
          Transactional Emails
        </Typography>
        <Typography variant="body1">
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
      </Box>
    ),
  },
  {
    id: HelpEmailsQuestions.Unsubscribing,
    question: 'How do I unsubscribe from Emails?',
    summary:
      'You can unsubscribe from marketing emails by clicking the unsubscribe link in the email.',
    answer: (
      <Typography component={'div'}>
        You can unsubscribe from marketing emails by:
        <ul>
          <li>Clicking the unsubscribe link in the email you received.</li>
          <li>Contacting us.</li>
        </ul>
      </Typography>
    ),
  },
  {
    id: HelpEmailsQuestions.NotReceiving,
    question: 'Why am I not receiving Emails?',
    summary:
      'If you are not receiving emails, check your spam folder and update your email address.',
    answer: (
      <Typography>
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
            <Link href={routes.contact.path()}>contact us</Link> directly.
          </li>
        </ul>
      </Typography>
    ),
  },
];
