import { LinkedIn } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { urls } from '../../layout/util';

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
          p: { xs: 1, sm: 3 },
        }}
      >
        <Container
          sx={{
            pt: 3,
            pb: 6,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <HeaderText variant="h3">About Us</HeaderText>
          <ParagraphText>
            <Link href="/faq">Frequently Asked Questions</Link>
          </ParagraphText>
          <br />
          <HeaderText variant="h4">Our Mission</HeaderText>
          <ParagraphText>
            Charity.Games is a non-profit organization dedicated to creating fun
            and free games that help support charitable causes. At Charity.Games
            we believe that everyone should have access to clean water. We also
            believe that everyone should have access to fun games. We combine
            these two ideas to create a platform that allows you to play fun
            games while also helping people in need. Every game you play on our
            platform generates water for people in need. We currently support{' '}
            <Link href={urls.external.waterOrg}>Water.Org</Link> as our charity
            of choice.
          </ParagraphText>
          <br />
          <ParagraphText>
            If you have a charity you would like to see us support, please{' '}
            <Link href={'/contact'}>contact us.</Link>
          </ParagraphText>
          <br />

          <HeaderText variant="h4">The Team</HeaderText>
          <HeaderText variant="h6">
            Miguel Campos - Software Engineer
          </HeaderText>
          <ParagraphText>
            <Link href={urls.social.linkedIn}>Miguel</Link> is currently a
            software engineer at{' '}
            <Link href={urls.external.fullstory}>FullStory</Link> and a graduate
            from San Diego State University. He is passionate about creating
            software that makes the world a better place. He is currently the
            lead developer of Charity.Games. Before working at FullStory, he
            worked at <Link href={urls.external.g2ss}>G2 Software Systems</Link>
            , <Link href={urls.external.sdsu}>San Diego State University</Link>,{' '}
            <Link href={urls.external.usd}>University of San Diego</Link>, and{' '}
            <Link href={urls.external.navwar}>NAVWAR</Link> as a Software
            Engineer.
          </ParagraphText>
          <ParagraphText>
            When Miguel is not working, he enjoys rock climbing, hiking, and
            playing board games with his friends. Miguel really hates writing
            about himself in the third person, but he is doing it anyway.
          </ParagraphText>
          <br />
          <QuoteText
            text="Individually, we are one drop. Together, we are an ocean."
            author="Ryunosuke Satoro"
          />
          <br />
          <br />
          <Box>
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<LinkedIn sx={{ height: 30, width: 30 }} />}
              href={urls.social.linkedIn}
              sx={{
                lineHeight: 1,
                fontFamily: 'Dangrek',
                px: 3,
                borderRadius: 6,
              }}
            >
              Connect With Miguel
            </Button>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

const HeaderText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Dangrek',
}));

const ParagraphText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant="body1" fontSize={'.95rem'} {...props} />
)();

const QuoteText: FC<{ text: string; author: string }> = ({ text, author }) => {
  return (
    <Box>
      <ParagraphText fontStyle={'italic'} fontWeight={500}>
        {text}
      </ParagraphText>
      <ParagraphText pl={4}>- {author}</ParagraphText>
    </Box>
  );
};
