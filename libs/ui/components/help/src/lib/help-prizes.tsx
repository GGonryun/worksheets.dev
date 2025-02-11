'use client';

import { Box, Link, Typography } from '@mui/material';
import {
  contestsRoutes,
  helpRoutes,
  playRoutes,
  portalRoutes,
} from '@worksheets/routes';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { Emoji } from '@worksheets/ui-core';
import { HelpPrizesQuestions, InventoryPanels } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

export const helpPrizes: QuestionAnswer[] = [
  {
    id: HelpPrizesQuestions.WhatAre,
    question: 'What are prizes?',
    summary:
      'Prizes are rewards that you can win by participating in contests.',
    answer: (
      <Box>
        <Typography>
          Prizes are rewards that you can win by participating in contests
          <br />
          <br />
          All prizes are digital and can be claimed in{' '}
          <Link href={portalRoutes.account.inventory.url()}>your account</Link>.
          <br />
          <br />
          If you are unable to claim a prize, please{' '}
          <Link href={helpRoutes.contact.url()}>contact us</Link> for
          assistance.
          <br />
          <br />
          <b>
            Participation in physical prize raffles will be locked to your
            country of origin.
          </b>
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'Access your inventory',
              href: portalRoutes.account.inventory.url(),
            },
            { text: 'View Raffles', href: contestsRoutes.raffles.url() },
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
          You can win prizes by participating in contests
          <br />
          <br />
          <Link href={portalRoutes.signUp.url()}>Create an account</Link> to
          start
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Play Games', href: playRoutes.home.url() },
            { text: 'View Contests', href: contestsRoutes.home.url() },
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
          <Link href={contestsRoutes.raffles.url()}>raffles page</Link>.
          <br />
          <br />
          If you have won a prize, you will receive a notification and an email
          to claim your prize. You can find all your prizes in your{' '}
          <Link href={portalRoutes.account.inventory.url()}>
            inventory page
          </Link>
          .
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Enter Raffles', href: contestsRoutes.raffles.url() },
            {
              text: 'See my inventory',
              href: portalRoutes.account.inventory.url(),
            },
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
            href={portalRoutes.account.inventory.url({
              bookmark: InventoryPanels.Items,
            })}
          >
            inventory page
          </Link>
          . If you have won a prize, you will receive a notification to claim
          your prize. You can find all your prizes in your{' '}
          <Link href={portalRoutes.account.inventory.url()}>
            inventory page
          </Link>
          .
          <br />
          <br />
          We will attempt to deliver your prize to you within 24 hours. If you
          do not claim your prize within the expiration time frame, we will stop
          notifying you and your prize <i>may</i> be forfeited.
          <br />
          <br />
          If you are unable to claim a prize, please{' '}
          <Link href={helpRoutes.contact.url()}>contact us</Link> for
          assistance.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'See my inventory',
              href: portalRoutes.account.inventory.url(),
            },
            {
              text: 'Contact Us',
              href: helpRoutes.contact.url(),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.TradeCode,
    question: 'Can I trade my code?',
    summary:
      'In most cases, codes are non-transferable, but we may allow it in rare circumstances.',
    answer: (
      <Box>
        <b>
          <Emoji symbol="🛑" label="Stop!" /> Your code must not have been
          accessed to be eligible for trade! <Emoji symbol="🛑" label="Stop!" />
        </b>
        <br />
        <br />
        In most cases, codes are non-transferable, but we may allow it. If you
        would like to trade your code, please{' '}
        <Link href={helpRoutes.contact.url()}>contact us</Link> for assistance.
        <br />
        <br />
        We will review your request and determine if we can allow the trade. If
        we allow the trade, we will provide you with instructions on how to
        proceed.
        <br />
        <br />
        Your code may be eligible for a trade if:
        <ul>
          <li>Your code has not been accessed</li>
          <li>Your code is not expired</li>
          <li>Your code is not locked to your account</li>
          <li>The code you earned is not redeemable in your region</li>
          <li>The code you earned is for a prize you already own</li>
        </ul>
        <b>We reserve the right to deny any trade request at our discretion.</b>
        <br />
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'My Activation Codes',
              href: portalRoutes.account.inventory.url({
                bookmark: InventoryPanels.ActivationCodes,
              }),
            },
            {
              text: 'Contact Us',
              href: helpRoutes.contact.url(),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPrizesQuestions.SteamKeys,
    question: 'How do I redeem Steam keys?',
    summary: 'Reedem Steam keys by following the instructions below.',
    answer: (
      <Box>
        For instructions on how to redeem Steam keys, follow these steps:
        <ol>
          <li>
            Open the Steam client and log in to your account. If you do not have
            the Steam client, you can download it from{' '}
            <Link href="https://store.steampowered.com/about/">Steam</Link>.
          </li>
          <li>
            Click on the "<b>Games</b>" menu and select "
            <b>Activate a Product on Steam</b>."
          </li>
          <Box position="relative" maxWidth="500px" mt={0.5} mb={1}>
            <i>Windows client:</i>
            <ResponsiveImage
              src="/help/prizes/steam/tutorial-1.png"
              alt={'Steam privacy settings'}
            />
            <i>Mac client:</i>
            <ResponsiveImage
              src="/help/prizes/steam/tutorial-0.png"
              alt={'Steam privacy settings'}
            />
          </Box>
          <li>
            Follow the on-screen instructions to enter your Steam key. You will
            receive a confirmation message if the key is valid.
          </li>
          <Box position="relative" maxWidth="500px" mt={0.5} mb={1}>
            <ResponsiveImage
              src="/help/prizes/steam/tutorial-2.png"
              alt={'Steam privacy settings'}
            />
          </Box>
          <li>
            Your game will be added to your library, and you can download and
            play it at any time.
          </li>
          <Box position="relative" maxWidth="500px" mt={0.5} mb={1}>
            <ResponsiveImage
              src="/help/prizes/steam/tutorial-3.png"
              alt={'Steam privacy settings'}
            />
          </Box>
        </ol>
        If you encounter any issues redeeming your Steam key, please{' '}
        <Link href={helpRoutes.contact.url()}>contact us</Link> for assistance.
        <br />
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'Steam Guide: How to Redeem a Steam Key',
              href: 'https://help.steampowered.com/en/faqs/view/2A12-9D79-C3D7-F870',
            },
            {
              text: 'My Activation Codes',
              href: portalRoutes.account.inventory.url({
                bookmark: InventoryPanels.ActivationCodes,
              }),
            },
            {
              text: 'Contact Us',
              href: helpRoutes.contact.url(),
            },
          ]}
        />
      </Box>
    ),
  },
];
