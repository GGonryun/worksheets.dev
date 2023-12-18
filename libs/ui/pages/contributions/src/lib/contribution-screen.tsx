import { SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  CharityBallot,
  CharityBook,
  CharityBox,
  CharityGroup,
  CharityWater,
} from '@worksheets/ui/icons';
import urls from '@worksheets/util/urls';
import { FC, JSXElementConstructor } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContributionScreenProps {}

export function ContributionScreen(props: ContributionScreenProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          gap: 2,
        }}
      >
        <IconBox>
          <CharityBallot sx={{ fontSize: '4rem', mt: -2 }} />
          <TitleText variant="h1">Contribute a game</TitleText>
        </IconBox>
        <Typography>
          Help us build the worlds first arcade for social good. Our platform
          provides a way for you to contribute to the causes you care about. Get
          your game out to thousands of players, build your brand, and make a
          difference.
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ xs: '100%', sm: 'fit-content' }}
          gap={2}
        >
          <RoundedButton
            variant="contained"
            color="error"
            href={urls.forms.submission}
            target="_blank"
          >
            Share your game
          </RoundedButton>
          <Button
            variant="text"
            color="error"
            href="/faq"
            sx={{
              fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
              width: { xs: '100%', sm: 'fit-content' },
            }}
          >
            Frequently Asked Questions
          </Button>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          gap: 4,
        }}
      >
        <TitleText variant="h1" textAlign="center" my={1}>
          Together, we can make a difference
        </TitleText>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          <ReasonSection
            title="Check out our blog"
            description="Learn more about our impact, web games, and working with us."
            Icon={CharityBook}
            action={{
              href: '/blog',
              label: 'Read More',
              variant: 'outlined',
            }}
          />
          <ReasonSection
            title="Share your game"
            description="Donate a game to our platform and help us make a difference."
            Icon={CharityBox}
            action={{
              href: urls.forms.submission,
              target: '_blank',
              label: 'Submit a game',
              variant: 'contained',
            }}
          />
          <ReasonSection
            title="Get to know us"
            description="We're on a mission to make the world a better place."
            Icon={CharityWater}
            action={{
              href: '/about',
              label: 'About us',
              variant: 'outlined',
            }}
          />
        </Box>
      </Paper>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          gap: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <TitleText variant="h1">Reasons to work with us</TitleText>
        <ul style={{ margin: 0 }}>
          <ListItem>Instant access to our global player base.</ListItem>
          <ListItem>Dedicated help from our developer support team.</ListItem>
          <ListItem>
            Build your brand and reputation as a socially responsible company.
          </ListItem>
          <ListItem>
            Get your game in front of thousands of players, world-wide.
          </ListItem>
          <ListItem>
            We handle all payment processing, distribution, and advertising for
            you
          </ListItem>
        </ul>

        <CharityGroup sx={{ fontSize: '8rem' }} />
        <RoundedButton variant="outlined" color="error" href="/contact">
          Contact Us
        </RoundedButton>
      </Paper>
    </Container>
  );
}

const ReasonSection: FC<{
  title: string;
  description: string;
  Icon: SvgIconComponent;
  action: {
    href: string;
    target?: '_blank';
    label: string;
    variant: ButtonProps['variant'];
  };
}> = ({ title, description, Icon, action }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        maxWidth: 270,
      }}
    >
      <Icon sx={{ fontSize: '5rem' }} />
      <SubtitleText variant="h2">{title}</SubtitleText>
      <Typography textAlign="center">{description}</Typography>
      <RoundedButton
        variant={action.variant}
        color="error"
        href={action.href}
        target={action.target}
      >
        {action.label}
      </RoundedButton>
    </Box>
  );
};

const IconBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

const TitleText = styled(Typography)(({ theme }) => ({
  lineHeight: 1,
  fontSize: '2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  fontFamily: theme.typography.mPlus1p.fontFamily,
}));

const RoundedButton = styled<
  JSXElementConstructor<ButtonProps & { target?: string }>
>(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 12,
  fontFamily: theme.typography.mPlus1p.fontFamily,
  width: '100%',
  textTransform: 'none',
  fontSize: '1rem',
  padding: theme.spacing(0.5, 4),
  marginTop: theme.spacing(1),
  boxSizing: 'border-box',
  '&.MuiButton-outlined': {
    border: `2px solid`,
  },
  '&.MuiButton-outlined:hover': {
    border: `2px solid`,
  },
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
    fontSize: '1.15rem',
    padding: theme.spacing(0.5, 8),
    marginTop: theme.spacing(1),
  },
}));
