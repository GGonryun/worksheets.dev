import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import urls from '@worksheets/util/urls';

export const helpFaq: QuestionAnswer[] = [
  {
    id: 'developer-help',
    question: "I'm a developer. How can I help?",
    summary:
      "We're always looking for new games to add to our platform. If you have a game that you'd like to add, please use our contribution portal.",
    answer: (
      <Box>
        <Typography>
          We're glad you asked! As a developer, you can help us in a number of
          ways:
        </Typography>
        <OrderedList>
          <ListItem>
            Add your game to our platform. We're always looking for new games to
            add to our platform. If you have a game that you'd like to add,
            please use our <Link href="/contribute">contribution portal</Link>.
          </ListItem>
          <ListItem>
            Help us improve our platform. We're always looking for ways to
            improve our platform. If you have any suggestions, please{' '}
            <Link href="/contact">contact us</Link>.
          </ListItem>
          <ListItem>
            Help us fix bugs. If you find a bug, please file a bug report on our{' '}
            <Link href={urls.social.github}>GitHub repository</Link>.
          </ListItem>
        </OrderedList>
      </Box>
    ),
  },
  {
    id: 'player-help',
    question: "I'm a player. How can I help?",
    answer: (
      <Box>
        <Typography>
          We're glad you asked! As a player, you can help us in a number of
          ways:
        </Typography>
        <OrderedList>
          <ListItem>
            Play games on our platform. The more games you play, the more money
            we can raise for charity.
          </ListItem>
          <ListItem>
            Help us spread the word. The more people that know about our
            platform, the more money we can raise for charity. If you have a
            following on social media, please consider sharing our platform with
            your followers.
          </ListItem>
          <ListItem>
            Share your feedback. We're always looking for ways to improve our
            platform. If you have any suggestions, please{' '}
            <Link href="/contact">contact us</Link>.
          </ListItem>
        </OrderedList>
      </Box>
    ),

    summary: `The more games you play, the more money we can raise for charity.`,
  },
  {
    id: 'teacher-help',
    question: "I'm a teacher. How can I help?",
    answer: (
      <Box>
        <Typography>
          We're glad you asked! As a teacher, we'd like to <b>help you</b> raise
          money for your school and your classroom.
          <br />
          <br />
          Teachers are eligible for our referral program. You will receive an
          affiliate link so all funds raised by your students will be credited
          to you classroom or your school.
          <br />
          <br />
          Teachers are also eligible for our ambassador program. You will
          receive a free shirt and other perks for your classroom! We're also
          looking for teachers who are interested in helping us create
          educational content for our website.
          <br />
          <br />
          Please <Link href="/contact">contact us</Link> for more information on
          our affiliate and referral programs.
        </Typography>
      </Box>
    ),
    summary: `We appreciate your support! As a teacher, we'd like to help you raise money for your school and your classroom.`,
  },
  {
    id: 'charity-help',
    question: "I'm a charity. How can I help?",
    summary: `Let us feature your charity on our platform! We'd love to help you raise money for your cause.`,
    answer: (
      <Box>
        <Typography>
          We'd love to have you on our platform!
          <br /> <br />
          As a charity organization, we'd like to help you raise money for your
          cause. We're looking for more charities to feature on our platform.
          <br /> <br />
          Charities are eligible for our ambassador and affiliate programs. You
          will receive special links so that all funds raised by your supporters
          go straight to your charity.
          <br /> <br />
          Please <Link href="/contact">contact us</Link> for more information on
          our ambassador and affiliate programs.
        </Typography>
      </Box>
    ),
  },
  {
    id: 'content-help',
    question: "I'm a content creator. How can I help?",
    summary: `Content creators are eligible for our ambassador program. We support content creators who are interested in helping us create content about our website.`,
    answer: (
      <Box>
        <Typography>
          We'd love to have you on our platform! As a content creator, you can
          help us in a number of ways:
        </Typography>
        <OrderedList>
          <ListItem>
            Promote our platform on your stream. We have a number of assets that
            you can use to promote our platform on your stream. Please{' '}
            <Link href="/contact">contact us</Link> for more information.
          </ListItem>
          <ListItem>
            Help us spread the word. The more people that know about our
            platform, the more money we can raise for charity. If you have a
            following on social media, please consider sharing our platform with
            your followers.
          </ListItem>
          <ListItem>
            All content creator get a free shirt if they become members of our
            ambassador program. Please <Link href="/contact">contact us</Link>{' '}
            to learn more about this program!
          </ListItem>
        </OrderedList>
      </Box>
    ),
  },
  {
    id: 'professional-help',
    question: "I'm a professional. How can I help?",
    summary: `Depending on what skills you have, you can help us in a number of ways. Contact us to learn more!`,
    answer: (
      <Box>
        <Typography>
          Thanks for asking! Depending on what skills you have, you can help us:
        </Typography>
        <OrderedList>
          <ListItem>
            If you're a graphic designer, you can help us design our website and
            marketing materials.
          </ListItem>
          <ListItem>
            If you're a web developer, you can help us improve our platform.
          </ListItem>
          <ListItem>
            If you're a lawyer, you can help us with our legal documents.
          </ListItem>
          <ListItem>
            If you're a marketer, you can help us promote our platform.
          </ListItem>
          <ListItem>
            If you're a writer, you can help us create content for our website.
          </ListItem>
          <ListItem>
            If you're a professional in another field, we still need your help!
            Please <Link href="/contact">contact us</Link> and we'll find a way
            for you to help.
          </ListItem>
        </OrderedList>
      </Box>
    ),
  },
  {
    id: 'student-help',
    question: "I'm a student. How can I help?",
    summary: `You should be focusing on your studies! But if you have some free time, you can help us by spreading awareness about our platform, playing games, and building content.`,
    answer: (
      <Box>
        <Typography>
          You should be focusing on your studies! But if you have some free
          time, you can help us in a number of ways:
        </Typography>
        <OrderedList>
          <ListItem>
            Depending on what skills you have, you can help us in the same ways
            that professionals can help us. See the answer to the previous
            question for more information.
          </ListItem>
          <ListItem>
            If you're a student in a computer science program, you can help us
            add new games to our platform.
          </ListItem>
          <ListItem>
            If you can promote our platform on your campus, you can help us
            spread the word.
          </ListItem>
          <ListItem>
            If you want to become a campus ambassador, please{' '}
            <Link href="/contact">contact us</Link> for a free shirt and other
            perks.
          </ListItem>
        </OrderedList>
      </Box>
    ),
  },
  {
    id: 'parent-help',
    question: "I'm a parent. How can I help?",
    answer: (
      <Box>
        <Typography>
          Thank you for being a great parent! As a parent, you can help us in a
          number of ways:
        </Typography>
        <OrderedList>
          <ListItem>
            If you have a child that's a student, you can encourage them to help
            us. See the answer to the previous question for more information.
          </ListItem>
          <ListItem>
            If you want to become an ambassador for your child's school, please{' '}
            <Link href="/contact">contact us</Link> for a free shirt and other
            perks.
          </ListItem>
          <ListItem>
            If you are a professional, you can help us in the same ways that
            professionals can help us. See the answer to the question about
            professionals for more information.
          </ListItem>
          <ListItem>
            If you have a child with a disability, you can help us improve our
            platform. Please <Link href="/contact">contact us</Link> for more
            information.
          </ListItem>
        </OrderedList>
      </Box>
    ),
    summary: `Thank you for being a great parent and taking an interest in our platform! If you want to donate time or money, please contact us. If you want to help us spread the word, please share our platform with your friends and family.`,
  },
  {
    id: 'organization-help',
    question: "I'm an organization. How can I help?",
    summary: `Organizations can help donate goods or services, help us spread the word, or sponsor our platform.`,
    answer: (
      <Box>
        <Typography>
          We'd love to have you on our platform! As an organization, you can:
        </Typography>
        <OrderedList>
          <ListItem>
            Donate goods or services to our platform. This lets us offer free
            prizes to our players which encourages them to play more games. Our
            platform multiplies the value of your donation by using it as a
            prize in a tournament, raffle, auction, or giveaway.
          </ListItem>
          <ListItem>
            Help us spread the word. The more people that know about our
            platform, the more money we can raise for charity. If you have a
            following on social media, please consider sharing our platform with
            your followers.
          </ListItem>
          <ListItem>
            Sponsor our platform. We're always looking for sponsors to help us
            cover our operating costs. If you're interested in sponsoring our
            platform, please <Link href="/contact">contact us</Link>.
          </ListItem>
        </OrderedList>
      </Box>
    ),
  },
  {
    id: 'sponsor-help',
    question: "I'm a sponsor. How can I help?",
    answer: (
      <Box>
        <Typography>
          We're glad you asked! As a sponsor, you can help us in a number of
          ways:
        </Typography>
        <OrderedList>
          <ListItem>
            Donate money to our current campaign. You can make direct
            contributions to our current campaign{' '}
            <Link href="/charity">here</Link> or you can donate to our charity
            of the month <Link href="/charity">here</Link>.
          </ListItem>
          <ListItem>
            Tell your friends about us. The more people that know about our
            platform, the more money we can raise for charity. If you have a
            following on social media, please consider sharing our platform with
            your followers.
          </ListItem>
          <ListItem>
            Sponsor a hackathon or game jam on our platform. We want to
            encourage the next generation of developers to build games. If
            you're interested in sponsoring a hackathon or game jam on our
            platform, please <Link href="/contact">contact us</Link>.
          </ListItem>
          <ListItem>
            Sponsor our platform. We're always looking for sponsors to help us
            cover our operating costs. If you're interested in sponsoring our
            platform, please <Link href="/contact">contact us</Link>.
          </ListItem>
        </OrderedList>
      </Box>
    ),
    summary: `Sponsors can help host special events, donate money, and help us spread the word.`,
  },
  {
    id: 'wealthy-help',
    question: 'I have a lot of money. How can I help?',
    answer: (
      <Box>
        <Typography>
          We're glad you asked! As a wealthy individual, you can help us in a
          number of ways:
        </Typography>
        <OrderedList>
          <ListItem>
            Donate money to our current campaign. You can make direct
            contributions to our current campaign{' '}
            <Link href="/charity">here</Link> or you can donate to our charity
            of the month <Link href="/charity">here</Link>.
          </ListItem>
          <ListItem>
            Tell your millionaire buddies about us. The more people that know
            about our platform, the more money we can raise for charity. If you
            have a following on social media, please consider sharing our
            platform with your followers.
          </ListItem>
          <ListItem>
            Sponsor our platform. We're always looking for sponsors to help us
            cover our operating costs. If you're interested in sponsoring our
            platform, please <Link href="/contact">contact us</Link>.
          </ListItem>
        </OrderedList>
      </Box>
    ),
    summary: `Wealthy individuals can help donate money, host special events, and help us cover operating costs.`,
  },
  {
    id: 'im-broke-help',
    question: "I'm broke. How can I help?",
    summary: `You can help us spread the word! The more people that know about our platform, the more money we can raise for charity.`,
    answer: (
      <Box>
        <Typography>
          Individually we are a drop, but together we are an ocean. You can help
          us spread the word! The more people that know about our platform, the
          more money we can raise for charity.
          <br />
          <br />
          If you are eager to help, please{' '}
          <Link href="/contact">contact us</Link> and we will find a way for you
          to make a difference and help us raise money for charity.
        </Typography>
      </Box>
    ),
  },
];
