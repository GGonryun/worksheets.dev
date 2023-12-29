import { LinkedIn } from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { blogAuthors } from '@worksheets/data-access/charity-games';
import urls from '@worksheets/util/urls';
import { FC } from 'react';

export type AboutScreenProps = {
  // no props
};

export const AboutScreen: FC<AboutScreenProps> = (props) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h3">About Us</Typography>
        <Typography>
          <Link href="/faq">Frequently Asked Questions</Link>
        </Typography>
        <br />
        <Typography variant="h4">Our Mission</Typography>
        <Typography>
          Charity Games is a community of developers, designers, artists,
          musicians, and gamers united by a common goal: using the power of
          gaming to create a positive impact on the world.
          <br />
          <br />
          Charity Games has built an online arcade dedicated to creating fun and
          free browser games that help support charitable causes. We believe
          that everyone should have access to clean water. We also believe that
          everyone should have access to fun games. We combine these two ideas
          to create a platform that allows you to play fun games while also
          helping people in need. Every game you play on our platform generates
          water for people in need. We currently support{' '}
          <Link href={urls.external.waterOrg}>Water.Org</Link> as our charity of
          choice. Read more about our{' '}
          <Link href="/charity">current donation campaign here</Link>.
          <br />
          <br />
          If you have a charity you would like to see us support, please{' '}
          <Link href={'/contact'}>contact us.</Link>
        </Typography>
        <br />
        <Typography variant="h4">The Team</Typography>
        <Typography variant="h6" id={blogAuthors['miguel-campos'].id}>
          Miguel Campos - Software Engineer
        </Typography>
        <Typography>
          <Link href={urls.social.linkedIn}>Miguel</Link> is currently a
          software engineer at{' '}
          <Link href={urls.external.fullstory}>FullStory</Link> and a graduate
          from San Diego State University. He is passionate about creating
          software that makes the world a better place. He is currently the lead
          developer of Charity.Games. Before working at FullStory, he worked at{' '}
          <Link href={urls.external.g2ss}>G2 Software Systems</Link>,{' '}
          <Link href={urls.external.sdsu}>San Diego State University</Link>,{' '}
          <Link href={urls.external.usd}>University of San Diego</Link>, and{' '}
          <Link href={urls.external.navwar}>NAVWAR</Link> as a Software
          Engineer.
          <br />
          <br />
          When Miguel is not working, he enjoys rock climbing, hiking, and
          playing board games with his friends. Miguel really hates writing
          about himself in the third person, but he is doing it anyway.
        </Typography>
        <br />
        <QuoteText
          text="Individually, we are one drop. Together, we are an ocean."
          author="Ryunosuke Satoro"
        />
        <br />
        <Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<LinkedIn sx={{ height: 30, width: 30 }} />}
            href={urls.social.linkedIn}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              lineHeight: 1,
              fontFamily: 'Dangrek',
              px: 3,
              borderRadius: 6,
            }}
          >
            Connect With Miguel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const QuoteText: FC<{ text: string; author: string }> = ({ text, author }) => {
  return (
    <Box>
      <Typography fontStyle={'italic'} fontWeight={500} variant="body2">
        {text}
      </Typography>
      <Typography pl={4} variant="body2">
        - {author}
      </Typography>
    </Box>
  );
};
