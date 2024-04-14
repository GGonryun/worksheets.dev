import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { HelpPrizesQuestions, InventoryPanels } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpPrizes: QuestionAnswer[] = [
  {
    id: HelpPrizesQuestions.WhatAre,
    question: 'What are prizes?',
    summary:
      'Prizes are rewards that you can win by playing games and entering raffles.',
    answer: (
      <Box>
        <Typography>
          Prizes are rewards that you can win by playing games and entering
          raffles. Prizes can include gift cards, cash, electronics, and more.
          <br />
          <br />
          All prizes are digital and can be claimed in{' '}
          <Link href={routes.account.inventory.path()}>your account</Link>.
          <br />
          <br />
          If you are unable to claim a prize, please{' '}
          <Link href={routes.contact.path()}>contact us</Link> for assistance.
          You may receive an alternative prize or tokens equal to the prize
          value.
          <br />
          <br />
          <b>
            Participation in physical prize raffles will be locked to your
            country of origin. If you are unable to receive a physical prize,
            you will receive tokens or a cash reward equal to the prize value.
          </b>
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'Access your inventory',
              href: routes.account.inventory.path(),
            },
            { text: 'View Raffles', href: routes.raffles.path() },
            { text: 'Learn about Tokens', href: routes.help.tokens.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.HowToWin,
    question: 'How do I win prizes?',
    summary:
      'You can win prizes by playing games, entering raffles, and prize draws.',
    answer: (
      <Box>
        <Typography>
          You can win prizes by playing games, entering raffles, and prize
          draws. You must have enough tokens to enter raffles and prize draws.
          <br />
          <br />
          <Link href={routes.signUp.path()}>Create an account</Link> to start
          earning tokens.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Play Games', href: routes.play.path() },
            { text: 'Enter Raffles', href: routes.raffles.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.HowToSee,
    question: 'How do I see prizes?',
    summary: 'You can see prizes by visiting the prizes page.',
    answer: (
      <Box>
        <Typography>
          Prizes that have active raffles can be found on the{' '}
          <Link href={routes.raffles.path()}>raffles page</Link>.
          <br />
          <br />
          If you have won a prize, you will receive a notification and an email
          to claim your prize. You can find all your prizes in your{' '}
          <Link href={routes.account.inventory.path()}>inventory page</Link>.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Enter Raffles', href: routes.raffles.expired.path() },
            { text: 'See my inventory', href: routes.account.inventory.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.HowToClaim,
    question: 'How do I claim prizes?',
    summary: 'You can claim prizes by visiting the inventory page.',
    answer: (
      <Box>
        <Typography>
          You can claim prizes by visiting the{' '}
          <Link
            href={routes.account.inventory.path({
              bookmark: InventoryPanels.Items,
            })}
          >
            inventory page
          </Link>
          . If you have won a prize, you will receive a notification and an
          email to claim your prize. You can find all your prizes in your{' '}
          <Link href={routes.account.inventory.path()}>inventory page</Link>.
          <br />
          <br />
          We will attempt to deliver your prize to you within 24 hours. You will
          receive an email with instructions on how to claim your prize. If you
          do not claim your prize within 14 days, we will stop notifying you and
          your prize <i>may</i> be forfeited.
          <br />
          <br />
          If you are unable to claim a prize, please{' '}
          <Link href={routes.contact.path()}>contact us</Link> for assistance.
          You may receive an alternative prize or tokens equal to the prize
          value.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Learn about Tokens', href: routes.help.tokens.path() },
            { text: 'See my inventory', href: routes.account.inventory.path() },
            {
              text: 'Contact Us',
              href: routes.contact.path(),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.HowToEarn,
    question: 'How do I earn tokens?',
    summary:
      'You can earn tokens by playing games, entering raffles, and prize draws.',
    answer: (
      <Box>
        <Typography>
          You can earn tokens by playing games, entering raffles, and sharing
          gifts with friends. You can also earn tokens by referring friends to
          the platform.
          <br />
          <br />
          <Link href={routes.account.quests.path()}>Create an account</Link> to
          start earning tokens.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Learn about Tokens', href: routes.help.tokens.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.HowToSpend,
    question: 'How do I spend tokens?',
    summary: 'You can spend tokens by entering raffles and prize draws.',
    answer: (
      <Box>
        <Typography>
          You can spend tokens by entering raffles and prize draws. You must
          have enough tokens to enter raffles and prize draws. Entering a raffle
          requires purchasing a ticket with tokens. The price of a ticket is
          displayed on the raffle page and differs for each prize and raffle.
          <br />
          <br />
          <Link href={routes.raffles.path()}>Enter a raffle</Link> to spend your
          tokens.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Learn about Tokens', href: routes.help.tokens.path() },
            { text: 'My Tokens', href: routes.account.quests.path() },
            { text: 'Enter Raffles', href: routes.raffles.path() },
          ]}
        />
      </Box>
    ),
  },
];
