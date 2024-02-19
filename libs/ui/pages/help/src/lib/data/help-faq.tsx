import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { routes } from '@worksheets/ui/routes';
import { HelpCommonQuestions } from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

export const helpFaq: QuestionAnswer[] = [
  {
    id: HelpCommonQuestions.WhatsYourMission,
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
    id: HelpCommonQuestions.RaisingMoney,
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
    id: HelpCommonQuestions.Developers,
    question: 'Where do games come from?',
    summary: `From people like you! We're a community driven platform. We're working on adding support for uploading games directly to our platform. In the meantime, you can submit games to us through our Contribution Portal`,
    answer: (
      <Typography>
        From people like you! We're a community driven platform. We're working
        on adding support for uploading games directly to our platform. In the
        meantime, you can submit games to us through our{' '}
        <Link href={routes.help.developers.path()}>Contribution Portal</Link>.
      </Typography>
    ),
  },
  {
    id: HelpCommonQuestions.Charities,
    question: 'Who do you support?',
    summary: `We are currently supporting Water.Org. You can see the current campaign on our Charity page.`,
    answer: (
      <Typography>
        We are currently supporting the{' '}
        <Link href="https://water.org/">Water.org</Link> organization.
        <br />
        <br />
        If you have a charity you would like us to support, please{' '}
        <Link href={routes.contact.path()}>contact us</Link>.
        <br />
        <br />
        If you are a charity and would like to partner with us, please read our{' '}
        <Link href={routes.help.contributions.path()}>Help Article</Link>.
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
        <Link href={routes.help.contributions.path()}>Contributions</Link> page
        to learn more about how you can help. Depending on your skills, you can
        help us by creating games, playing games, donating, or volunteering.
        <br />
        <br />
        If you have any questions, please feel free to{' '}
        <Link href={routes.contact.path()}>contact us</Link>.
      </Typography>
    ),
  },
  {
    id: HelpCommonQuestions.OriginStory,
    question: 'Why was this organization created?',
    answer: (
      <Typography>
        Charity Games was created to help people in need. We wanted to use the
        skills we have to make an impact. Read more{' '}
        <Link href={routes.about.path()}>about us</Link> and{' '}
        <Link href={routes.about.path()}>our mission here</Link>.
      </Typography>
    ),
    summary:
      'This organization was created to help people in need. We wanted to use the skills we have to make an impact.',
  },
  {
    id: HelpCommonQuestions.Trust,
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
        If you have any questions, please feel free to{' '}
        <Link href={routes.contact.path()}>contact us</Link>.
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
        <Link href={routes.about.path()}>Learn more about us</Link>.
      </Typography>
    ),
    summary:
      'Charity.Games is run by volunteers. Currently there is no paid staff and we have 1 volunteer. Your feedback is greatly appreciated.',
  },
  {
    id: HelpCommonQuestions.Bugs,
    question: 'I found a bug, what should I do?',
    answer: (
      <Typography>
        Please report it to us through our{' '}
        <Link href={routes.contact.path()}>contact</Link> page to submit an
        email.
      </Typography>
    ),
    summary: `Please report it to us through our contact page to submit an email.`,
  },
];
