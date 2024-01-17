import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

export const helpFaq: QuestionAnswer[] = [
  {
    id: 'whats-your-mission',
    question: "What's your mission?",
    summary:
      'We want to make the world a better place by using video games to raise money for charity.',
    answer: (
      <Typography>
        We want to make the world a better place by using video games to raise
        money for charity.
      </Typography>
    ),
  },
  {
    id: `how-does-playing-games-raise-money-for-charity`,
    question: 'How does playing games raise money for charity?',
    summary: `We're using ad revenue to raise money for charity. We're also working on adding support for donations. Our primary focus is to raise awareness by creating a community of gamers who want to make a difference.`,
    answer: (
      <Typography>
        We use ad revenue to raise money for charity and donations. The more
        players that visit our website the easier it is for us to encourage
        organizations, game developers, and advertisers to donate goods and
        services to our platform.
        <br />
        <br />
        Those goods and services are then used to raise money for charity. We
        also use the money we raise to pay for our operating costs.
      </Typography>
    ),
  },
  {
    id: 'where-do-games-come-from',
    question: 'Where do games come from?',
    summary: `From people like you! We're a community driven platform. We're working on adding support for uploading games directly to our platform. In the meantime, you can submit games to us through our Contribution Portal`,
    answer: (
      <Typography>
        From people like you! We're a community driven platform. We're working
        on adding support for uploading games directly to our platform. In the
        meantime, you can submit games to us through our{' '}
        <Link href="/contribute">Contribution Portal</Link>.
      </Typography>
    ),
  },
  {
    id: 'who-do-you-support',
    question: 'Who do you support?',
    summary: `We are currently supporting Water.Org. You can see the current campaign on our Charity page.`,
    answer: (
      <Typography>
        We are currently supporting the{' '}
        <Link href="https://water.org/">Water.org</Link> organization. You can
        see the current campaign on our <Link href="/charity">Charity</Link>{' '}
        page.
        <br />
        <br />
        If you have a charity you would like us to support, please{' '}
        <Link href="/contact">contact us</Link>.
        <br />
        <br />
        If you are a charity and would like to partner with us, please read our{' '}
        <Link href="/help#charity-help">Help Article</Link>.
      </Typography>
    ),
  },
  {
    id: 'how-can-i-help',
    question: 'How can I help?',
    summary:
      'Visit our Help page to learn more about how you can help. Depending on your skills, you can help us by creating games, playing games, donating, or volunteering.',
    answer: (
      <Typography>
        Visit our <Link href="/help">Help</Link> page to learn more about how
        you can help. Depending on your skills, you can help us by creating
        games, playing games, donating, or volunteering.
        <br />
        <br />
        If you have any questions, please feel free to{' '}
        <Link href="/contact">contact us</Link>.
      </Typography>
    ),
  },
  {
    question: 'Why was this organization created?',
    answer: (
      <Typography>
        Charity Games was created to help people in need. We wanted to use the
        skills we have to make an impact. Read more{' '}
        <Link href="/about">about us</Link> and{' '}
        <Link href="/about">our mission here</Link>.
      </Typography>
    ),
    summary:
      'This organization was created to help people in need. We wanted to use the skills we have to make an impact.',
    id: 'why-was-this-organization-created',
  },
  {
    id: 'i-do-not-trust-you',
    question: "I don't trust you, how do I know you're legit?",
    summary: `That's understandable. We're a new organization. We'll never ask you for money, all of our services are provided for free at no expense to you, our players. Our platform aims to provide as much transparency as possible.`,
    answer: (
      <Typography>
        That's understandable. We're a new organization. We're currently not
        asking you for money, all of our services are provided for free at no
        expense to you, our players. Our platform aims to provide as much
        transparency as possible.
        <br />
        <br />
        Our code is publicly available on{' '}
        <Link href={urls.social.github}>GitHub</Link>.
        <br />
        <br />
        You can also see all of our donation receipts on our{' '}
        <Link href="/donations">Donations</Link> page.
        <br />
        <br />
        If you have any questions, please feel free to{' '}
        <Link href="/contact">contact us</Link>.
      </Typography>
    ),
  },
  {
    id: 'who-runs-charity-games',
    question: 'Who runs Charity.Games?',
    answer: (
      <Typography>
        Charity.Games is run by volunteers. Currently there is no paid staff and
        we have 1 active volunteer. Your feedback is greatly appreciated.
      </Typography>
    ),
    summary:
      'Charity.Games is run by volunteers. Currently there is no paid staff and we have 1 volunteer. Your feedback is greatly appreciated.',
  },
  {
    id: 'i-found-a-bug-what-should-i-do',
    question: 'I found a bug, what should I do?',
    answer: (
      <Typography>
        Please report it to us on our{' '}
        <Link href={urls.social.github}>GitHub</Link> page. Or visit our{' '}
        <Link href="/contact">Contact</Link> page to submit an email.
      </Typography>
    ),
    summary: `Please report it to us on our Github page. Or visit our Contact page to submit an email.`,
  },
  {
    id: 'do-i-need-an-account',
    question: 'Do I need an account?',
    summary: `Creating a Charity.Games account unlocks several important features. You can win prizes, participate in auctions and giveaways, save your favorite games, earn achievements, vote on games and charities, compete on leaderboards, events, and tournaments, and submit games to our platform. You can play all of our games without an account, but you won't be able to do any of the above.`,
    answer: (
      <Box>
        <Typography>
          Creating a Charity.Games account unlocks several important features.
          You can:
        </Typography>
        <OrderedList>
          <ListItem>Start earning tokens for prizes.</ListItem>
          <ListItem>Participate in auctions and giveaways.</ListItem>
          <ListItem>Save your favorite games.</ListItem>
          <ListItem>Earn achievements.</ListItem>
          <ListItem>Vote on games and charities.</ListItem>
          <ListItem>Compete on leaderboards, events, and tournaments.</ListItem>
          <ListItem>Submit games to our platform.</ListItem>
        </OrderedList>
        <Typography>
          You can play all of our games without an account, but you won't be
          able to do any of the above.
          <br />
          <br />
          <Link href="/signup">Create your account today!</Link>
        </Typography>
      </Box>
    ),
  },
];
