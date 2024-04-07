import { LinkedIn } from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BookmarkAnchor, Markdown } from '@worksheets/ui-core';
import { Author, blogAuthors } from '@worksheets/util/blog';
import urls from '@worksheets/util/urls';
import Image from 'next/image';
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
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h3" color="text.arcade">
          About Us
        </Typography>
        <br />
        <br />
        <Typography variant="h4" color="text.arcade">
          Our Mission
        </Typography>
        <br />
        <Typography color="text.arcade" fontWeight={500}>
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
          <Link color="text.arcade" href={urls.external.waterOrg}>
            Water.Org
          </Link>{' '}
          as our charity of choice. Read more about our{' '}
          <Link color="text.arcade" href={routes.help.path()}>
            current donation campaign here
          </Link>
          .
          <br />
          <br />
          If you have a charity you would like to see us support, please{' '}
          <Link color="text.arcade" href={routes.contact.path()}>
            contact us.
          </Link>
        </Typography>
        <br />
        <br />
        <br />
        <Typography variant="h4" color="text.arcade">
          The Team
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 4,
          }}
        >
          <TeamMember
            {...blogAuthors[Author.TakiPineda]}
            title="Chief Executive Officer"
            description={
              "Taki is a 7 year old Yorkie who is currently working as the interim Charity Games CEO. Before coming to Charity Games, Taki served as Chief Financial Officer of Luna Cosmetics and Director of Enterprise Customer Success at Patty's Creations.\n\n He enjoys spending his working days sitting with Miguel as they work on charity games. He is very passionate about his meal choices, he prefers to eat chicken and salmon over anything else.\n\nOn his free time Taki enjoys walking outside with Miguel, sleeping on Miguel's bed, and cuddling with Miguel."
            }
            linkedIn={urls.social.linkedIn}
            quote={{
              text: 'Time is the moving image of the unmoving eternity.',
              author: 'Plato',
            }}
          />

          <TeamMember
            {...blogAuthors[Author.MiguelCampos]}
            title="Software Engineer"
            description={
              'Miguel is currently a software engineer at [P0 Security](https://p0.dev) and a graduate from San Diego State University. He is passionate about creating software that makes the world a better place. He is currently developing Charity.Games on his free time. \n\nBefore working at [P0 Security](https://p0.dev), he worked at: \n- [FullStory](https://fullstory.com/) as an Ecosystem Software Engineer, \n- [G2 Software Systems](https://g2-inc.com) as a Software Engineer I,\n- [University of San Diego](https://sandiego.edu) as a Volunteer Software Engineer,\n- [SDSU Research Foundation](https://sdsu.edu) as a Software Engineer Intern,\n- [NAVWAR](https://navwar.navy.mil) as a Software Engineer Intern.\nWhen Miguel is not working, he enjoys rock climbing, hiking, and playing board games with his friends. Miguel really hates writing about himself in the third person, but he is doing it anyway.'
            }
            linkedIn={urls.personal.linkedIn.miguel}
            quote={{
              text: 'Individually, we are one drop. Together, we are an ocean.',
              author: 'Ryunosuke Satoro',
            }}
          />

          <TeamMember
            {...blogAuthors[Author.EsbeidyCampos]}
            title="Project Manager"
            description={
              'Esbeidy recently graduated from the University of California, San Diego with a BS in business economics and is currently working as a business support intern for Outsiders Branding. She is passionate about project success and has a genuine commitment to fostering the success of individuals which was evident during her voluntary work with her sorority Delta Delta Delta where she served as Vice President of Operations. She hopes to find full time professional work as a Customer Success Specialist or as a Business support specialist.\n\nOn her free time Esbeidy also enjoys rock climbing, going to the gym, watching criminal minds and hanging out with her friends.'
            }
            linkedIn={urls.personal.linkedIn.esbeidy}
            quote={{
              text: "No, I'm not giving you a quote. Don't put me on your website. ",
              author: 'Esbeidy Campos',
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

const TeamMember: React.FC<{
  id: string;
  name: string;
  avatar: string;
  title: string;
  description: string;
  linkedIn: string;
  quote: {
    text: string;
    author: string;
  };
}> = (props) => (
  <Box py={3}>
    <Box display="flex" gap={1.5} alignItems="center">
      <Button
        variant="square"
        color="warning"
        size="small"
        href={props.linkedIn}
      >
        <LinkedIn sx={{ height: 30, width: 30 }} />
      </Button>
      <Box>
        <BookmarkAnchor id={props.id} />
        <Typography variant="h6" color="text.arcade">
          {props.name}
        </Typography>
        <Typography color="text.arcade" variant="body2" fontWeight={500}>
          {props.title}
        </Typography>
      </Box>
    </Box>
    <Image
      src={props.avatar}
      width={128}
      height={128}
      alt={props.name}
      style={{
        marginTop: 16,
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: 16,
      }}
    />
    <br />

    <Markdown
      text={props.description}
      sx={{
        fontWeight: 500,
        whiteSpace: 'pre-line',
        color: 'text.arcade',
        '& a': {
          color: 'inherit',
        },
      }}
    />
    <br />
    <br />
    <QuoteText text={props.quote.text} author={props.quote.author} />
    <br />
  </Box>
);

const QuoteText: FC<{ text: string; author: string }> = ({ text, author }) => {
  return (
    <Box>
      <Typography
        color="text.arcade"
        fontStyle={'italic'}
        fontWeight={500}
        variant="body2"
      >
        {text}
      </Typography>
      <Typography color="text.arcade" pl={2} variant="body2">
        - {author}
      </Typography>
    </Box>
  );
};
