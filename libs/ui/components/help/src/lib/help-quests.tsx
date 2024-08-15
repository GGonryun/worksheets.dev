import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BulletPoints } from '@worksheets/ui/components/lists';
import {
  HelpQuestsQuestions,
  HelpTokensQuestions,
} from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

export const helpQuests: QuestionAnswer[] = [
  {
    id: HelpQuestsQuestions.Description,
    question: 'What are Quests?',
    summary:
      'Quests are challenges on Charity Games that you can complete to earn tokens.',
    answer: (
      <Box>
        <Typography>
          Quests are the primary sources of tokens on Charity Games. Quests are
          challenges that you can complete to earn tokens. There are many
          different types of quests, including daily quests, weekly quests, and
          event quests. You can view your current quests on the{' '}
          <Link href={routes.account.quests.path()}>
            Quests section of your account page
          </Link>
          .
          <br />
          <br />
          If you are interested in adding a quest to Charity Games, please read
          the question{' '}
          <Link
            href={routes.help.quests.path({
              bookmark: HelpQuestsQuestions.AddingQuests,
            })}
          >
            "How do I add a Quest"?
          </Link>
          .
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: routes.help.playingGames.path(),
              text: 'Learn more about Playing Games',
            },
            {
              href: routes.help.referrals.path(),
              text: 'Learn more about Referrals',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpQuestsQuestions.Types,
    question: 'What are the different types of quests?',
    summary:
      'We support quests to drive engagement to your social media, game, or website with any frequency or format you need.',
    answer: (
      <Box>
        <Typography>
          Quests are categorized by their frequency and type. The frequency of
          each quest can be daily, weekly, event, one-time, unlimited, limited,
          or custom.{' '}
          <Link
            href={routes.help.quests.path({
              bookmark: HelpQuestsQuestions.Frequency,
            })}
          >
            Learn more about quest frequency
          </Link>
          .
          <br />
          <br />
          The type of each quest can be anything you need to drive engagement to
          your social media, game, or website. Some common quest types include:
          "Follow on Social Media", "Visit a web page", "Perform an action on
          Charity Games", "Play a game", "Watch a video", "Watch an
          Advertisement", or "Add a friend". We can create any custom type of
          quest to support your needs.{' '}
          <Link
            href={routes.help.quests.path({
              bookmark: HelpQuestsQuestions.AddingQuests,
            })}
          >
            Learn more about adding quests
          </Link>
          .
          <br />
          <br />
          All quests offer rewards in the form of tokens. The rewards for each
          quest vary depending on the quest. Some quests offer a fixed number of
          tokens, while others offer a random number of tokens. Some quests
          offer a chance to win a prize. You can view the rewards for each quest
          on the{' '}
          <Link href={routes.account.quests.path()}>
            Quests section of your account page
          </Link>
          .
          <br />
          <br />
          If there is a quest type or frequency that you would like to see on
          Charity Games, please{' '}
          <Link href={routes.contact.path()}>contact us</Link>.
        </Typography>
      </Box>
    ),
  },
  {
    id: HelpQuestsQuestions.AddingQuests,
    question: 'How do I add a Quest?',
    summary: 'Adding a quest to Charity Games',
    answer: (
      <Box>
        <Typography>
          If you are interested in adding a quest to Charity Games, please{' '}
          <Link href={routes.contact.path()}>contact us</Link>. Quests are a
          great way to drive engagement to your social media, game, or website.
          <br />
          <br />
          If you would like to learn more about the different types of quests on
          Charity Games, read the question:{' '}
          <Link
            href={routes.help.quests.path({
              bookmark: HelpQuestsQuestions.Types,
            })}
          >
            "What are the different types of quests?"
          </Link>
          .
        </Typography>
      </Box>
    ),
  },
  {
    id: HelpQuestsQuestions.Rewards,
    question: 'What are the rewards for completing quests?',
    summary: 'Earn tokens for completing quests.',
    answer: (
      <Typography>
        The rewards for completing quests vary depending on the quest. Some
        quests offer a fixed number of tokens, while others offer a random
        number of tokens. Some quests offer a chance to win a prize. You can
        view the rewards for each quest on the{' '}
        <Link href={routes.account.quests.path()}>
          Quests section of your account page
        </Link>
        .
        <br />
        <br />
        If you would like to learn more about tokens, read the question:{' '}
        <Link
          href={routes.help.tokens.path({
            bookmark: HelpTokensQuestions.Description,
          })}
        >
          "What are tokens?"
        </Link>
        .
      </Typography>
    ),
  },
  {
    id: HelpQuestsQuestions.Frequency,
    question: 'How often can I complete quests?',
    summary: 'Complete quests as often as you like.',
    answer: (
      <Box>
        <Typography>
          You can complete quests as often as you like. Some quests can be
          completed multiple times, while others can only be completed once. You
          can view the specific frequency of each quest on the{' '}
          <Link href={routes.account.quests.path()}>
            Quests section of your account page
          </Link>
          .
          <br />
          <br />
          A quest's expiration timer will begin as soon as you make progress
          towards that quest.
          <br />
          <br />
          For quests that can be completed multiple times, you can view your
          progress on the{' '}
          <Link href={routes.account.quests.path()}>
            Quests section of your account page
          </Link>
          .
        </Typography>
        <br />
        <BulletPoints
          title={'Frequency Types'}
          points={[
            'Daily - Can be completed once per day',
            'Weekly - Can be completed once per week',
            'Event - Can be completed once per event',
            'One Time - Can be completed once',
            'Unlimited - Can be completed as many times as you like',
            'Limited - Can be completed a set number of times',
            "Custom - Can be completed a limited number of times based on the quest's rules",
          ]}
        />
      </Box>
    ),
  },
];
