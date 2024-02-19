import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import {
  HelpPlayingGamesQuestions,
  HelpTokensQuestions,
} from '@worksheets/util/enums';
import {
  MAX_TOKENS_IN_GIFT_BOX,
  MAX_TOKENS_PER_GAME,
} from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpPlayingGames: QuestionAnswer[] = [
  {
    id: HelpPlayingGamesQuestions.WhatAre,
    question: 'What are games?',
    summary:
      'Games are fun and interactive activities that you can play to win prizes and tokens.',
    answer: (
      <Box>
        <Typography>
          Games are fun and interactive activities that you can play to win
          prizes and tokens.
          <br />
          <br />
          We have a variety of games for you to play. All our games have no
          advertisements and are free to play. You can earn tokens by playing
          games and use them to enter raffles and prize draws.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'View all game categories',
              href: routes.categories.path(),
            },
            { text: 'Play Games', href: routes.games.path() },
            {
              text: 'How to Play Games',
              href: routes.help.playingGames.path({
                bookmark: HelpPlayingGamesQuestions.HowToPlay,
              }),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.GameCategories,
    question: 'What games do you have?',
    summary:
      'We have a variety of games for you to play. All our games have no advertisements and are free to play.',
    answer: (
      <Box>
        <Typography>
          We have a variety of games for you to play. All our games have no
          advertisements and are free to play. You can earn tokens by playing
          games and use them to enter raffles and prize draws.
        </Typography>
        <br />
        <Typography variant="h6">Game Categories</Typography>
        <OrderedList>
          <ListItem>
            <Link
              href={routes.category.path({
                params: {
                  tagId: 'popular',
                },
              })}
            >
              Popular Games
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={routes.category.path({
                params: {
                  tagId: 'arcade',
                },
              })}
            >
              Arcade Games
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={routes.category.path({
                params: {
                  tagId: 'puzzle',
                },
              })}
            >
              Puzzle Games
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={routes.category.path({
                params: {
                  tagId: 'action',
                },
              })}
            >
              Action Games
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={routes.category.path({
                params: {
                  tagId: 'word',
                },
              })}
            >
              Word Games
            </Link>
          </ListItem>
        </OrderedList>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'View all game categories',
              href: routes.categories.path(),
            },
            { text: 'Play Games', href: routes.games.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.SupportedDevices,
    question: 'What devices can I play games on?',
    summary:
      'You can play games on any device that has a web browser. This includes desktop computers, laptops, tablets, and smartphones.',
    answer: (
      <Typography>
        You can play games on any device that has a web browser. This includes
        desktop computers, laptops, tablets, and smartphones. All of our games
        are supported on the latest versions of popular web browsers such as
        Google Chrome, Mozilla Firefox, and Safari.
      </Typography>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.HowToPlay,
    question: 'How do I play games?',
    summary:
      'You can play games by visiting the games page, selecting a game, and clicking the play button.',
    answer: (
      <Box>
        <Typography>
          You can play games by visiting the games page, selecting a game, and
          clicking the play button. You can earn tokens by playing games and use
          them to enter raffles and prize draws.
          <br />
          <br />
          Create an account to earn tokens and save your progress.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Play Games', href: routes.games.path() },
            { text: 'Connect to your account', href: routes.login.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.NotLoading,
    question: 'Why are games not loading?',
    summary:
      'Games may not load due to a slow internet connection or an outdated web browser.',
    answer: (
      <Box>
        <Typography>
          Games may not load due to a slow internet connection or an outdated
          web browser. We recommend using the latest version of popular web
          browsers such as Google Chrome, Mozilla Firefox, and Safari.
          <br />
          <br />
          If you are still having trouble, please contact our support team.
        </Typography>
        <br />
        <HelpfulLinks
          links={[{ text: 'Contact support', href: routes.contact.path() }]}
        />
      </Box>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.StorageIssues,
    question: 'Why are my scores not saving?',
    summary:
      "Your scores may not save if you're not logged in or if you're playing in private browsing mode.",
    answer: (
      <Box>
        <Typography>
          Your scores may not save if you're playing in private browsing mode.
          Mobile iOS devices have a feature called "Private Browsing" that
          prevents scores from being saved. You can turn off private browsing
          mode in your device settings.
          <br />
          <br />
          If you are having problems with your scores not saving and you are
          using an iOS device, you can disable{' '}
          <Link href="https://support.apple.com/en-is/guide/safari/sfri11471/16.0/mac/11.0#:~:text=In%20the%20Safari%20app%20on,Prevent%20cross%2Dsite%20tracking.%E2%80%9D">
            'Prevent Cross-Site Tracking'
          </Link>{' '}
          in your phone settings. This will allow your scores to be saved.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Connect to your account', href: routes.login.path() },
            { text: 'Contact support', href: routes.contact.path() },
            {
              text: 'Enable Cross-Site Tracking',
              href: '"https://support.apple.com/en-is/guide/safari/sfri11471/16.0/mac/11.0#:~:text=In%20the%20Safari%20app%20on,Prevent%20cross%2Dsite%20tracking.%E2%80%9D"',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.Developers,
    question: 'Who makes the games?',
    summary: 'Our games are developed by independent game developers.',
    answer: (
      <Box>
        <Typography>
          Our games are developed by independent game developers. Talented game
          developers from all over the world contribute and donate browser games
          to our platform.
          <br />
          <br />
          We are constantly adding new games and improving existing ones to
          provide you with the best gaming experience. If you are a game
          developer interested in contributing games, please{' '}
          <Link href={routes.contact.path()}>contact us</Link> or visit our{' '}
          <Link href={routes.help.developers.path()}>contribution portal</Link>{' '}
          to get started.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Contact us', href: routes.contact.path() },
            {
              text: 'Contribution Portal',
              href: routes.help.developers.path(),
            },
            { text: 'View all games', href: routes.games.path() },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.OfflineAccess,
    question: 'Can I play games offline?',
    summary: 'You need an internet connection to play games.',
    answer: (
      <Typography>
        You need an internet connection to play games. All of our games are
        hosted on our servers and require an internet connection to play.
        <br />
        <br />
        If you want to play games offline, please{' '}
        <Link href={routes.contact.path()}>contact us</Link> and let us know. We
        are considering adding this feature in the future.
      </Typography>
    ),
  },
  {
    id: HelpPlayingGamesQuestions.EarningTokens,
    question: 'How do I earn tokens?',
    summary:
      'You can earn tokens by playing games and participating in events.',
    answer: (
      <Box>
        <Typography>
          You can earn tokens by playing games. You can use tokens to enter
          raffles and prize draws.
          <br />
          <br />A random amount of tokens are automatically added to your
          account when you play a game (up to {MAX_TOKENS_PER_GAME}).
          Additionally, there's a small chance of finding a gift box while
          playing a game. If you find a gift box, you will receive a random
          amount of tokens (up to {MAX_TOKENS_IN_GIFT_BOX}).
          <br />
          <br />
          There are also other ways to earn tokens, such as{' '}
          <Link href={routes.help.referrals.path()}>
            referring friends
          </Link>,{' '}
          <Link href={routes.help.friends.path()}>
            sending gifts to friends
          </Link>
          ,{' '}
          <Link
            href={routes.help.tokens.path({
              bookmark: HelpTokensQuestions.HowToEarn,
            })}
          >
            claiming the daily reward
          </Link>
          , and participating in special events.
          <br />
          <br />
          For more ways to earn tokens, visit our{' '}
          <Link href={routes.help.tokens.path()}>Tokens Help</Link> page.
          <br />
          <br />
          <Link href={routes.signUp.path()}>Create an account</Link> to earn
          tokens and save your progress.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Play Games', href: routes.games.path() },
            { text: 'Create an account', href: routes.login.path() },
            {
              text: 'Learn about Gift Boxes',
              href: routes.help.tokens.path({
                bookmark: HelpTokensQuestions.GiftBoxes,
              }),
            },
          ]}
        />
      </Box>
    ),
  },
];
