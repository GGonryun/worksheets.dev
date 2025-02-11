'use client';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { helpRoutes } from '@worksheets/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { HelpCommonQuestions } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

export const helpFaq: QuestionAnswer[] = [
  {
    id: HelpCommonQuestions.WhatsYourMission,
    question: 'What is your mission?',
    summary:
      'We want to make the world a better place by using video games to raise money for charity.',
    answer: (
      <Typography>
        Charity Games is a community of developers, designers, artists,
        musicians, and gamers united by a common goal: using the power of gaming
        to create a positive impact on the world.
        <br />
        <br />
        <Link href={helpRoutes.about.url()}>
          Learn more about us and our team
        </Link>
        .
      </Typography>
    ),
  },
  {
    id: HelpCommonQuestions.RaisingMoney,
    question: 'How does playing games raise money for charity?',
    summary: `We're using ad revenue to raise money for charity. We're also working on adding support for donations. Our primary focus is to raise awareness by creating a community of gamers who want to make a difference.`,
    answer: (
      <Typography>
        We use advertising and marketing to raise money and awareness for
        charitable causes. Games on our platform show{' '}
        <i>optional, non-intrusive</i> advertisements which generate a small
        amount of revenue for our platform.
        <br />
        <br />
        Charity Games also hosts sponsored events such as giveaways to raise
        additional funds for charity. Giveaway prizes are donated by our
        sponsors or purchased with funds raised from advertisements.
        <br />
        <br />
        If you would like to sponsor a prize, please{' '}
        <Link href={helpRoutes.contact.url()}>contact us</Link>.
      </Typography>
    ),
  },
  {
    id: HelpCommonQuestions.Developers,
    question: 'Where do games come from?',
    summary: `From people like you! We're a community driven platform.`,
    answer: (
      <Typography>
        From people like you! We're a community driven platform. We're working
        on adding support for uploading games directly to our platform. In the
        meantime, you can{' '}
        <Link href={helpRoutes.contact.url()}>contact us</Link> if you are
        interested in contributing a game.
      </Typography>
    ),
  },
  {
    id: HelpCommonQuestions.Charities,
    question: 'Who do you support?',
    summary: `We are currently supporting Water.Org.`,
    answer: (
      <Typography component="div">
        We are currently supporting
        <OrderedList>
          <ListItem disablePadding>
            <Link href="https://water.org/">Water.Org</Link>
          </ListItem>
        </OrderedList>
        <br />
        We are not officially affiliated with these organizations. We are simply
        using our platform to raise awareness and funds for their causes.
        <br />
        <br />
        If you have a charity you would like us to support, please{' '}
        <Link href={helpRoutes.contact.url()}>contact us</Link>.
        <br />
        <br />
        If you are a charity and would like to partner with us, please read our{' '}
        <Link href={helpRoutes.contributions.url()}>Help Article</Link>.
      </Typography>
    ),
  },
  {
    id: HelpCommonQuestions.GetInvolved,
    question: 'How can I help?',
    summary:
      'Visit our Help page to learn more about how you can help. Depending on your skills, you can help us by creating games, playing games, donating, or volunteering.',
    answer: (
      <Typography>
        Visit our{' '}
        <Link href={helpRoutes.contributions.url()}>Contributions</Link> page to
        learn more about how you can help. Depending on your skills, you can
        help us by creating games, playing games, donating, or volunteering.
        <br />
        <br />
        If you have any questions, please feel free to{' '}
        <Link href={helpRoutes.contact.url()}>contact us</Link>.
      </Typography>
    ),
  },

  {
    id: HelpCommonQuestions.Owners,
    question: 'Who runs Charity.Games?',
    answer: (
      <Typography>
        Charity.Games is run by volunteers. Currently there is no paid staff and
        we have 2 active volunteers. Your feedback is greatly appreciated.
        <br />
        <br />
        <Link href={helpRoutes.about.url()}>Learn more about us</Link>.
      </Typography>
    ),
    summary:
      'Charity.Games is run by volunteers. Currently there is no paid staff and we have 1 volunteer. Your feedback is greatly appreciated.',
  },
];
