import { Box, Button, Container, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { FillImage, ResponsiveImage } from '@worksheets/ui/components/images';
import { GradientTypography } from '@worksheets/ui/components/typography';
import React from 'react';

import { deepDropShadow } from '../style';

export const InstructionsSection = () => (
  <Box
    sx={{
      position: 'relative',
      py: 6,
      background: (theme) => theme.palette.background.soft,
      borderRadius: (theme) => theme.shape.borderRadius * 2,
      boxShadow: deepDropShadow,
      zIndex: 6,
    }}
  >
    <Container
      component={Box}
      maxWidth="lg"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <GradientTypography
        textAlign="center"
        typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
        textTransform="uppercase"
        letterSpacing={{ xs: 1, sm: 2, md: 3 }}
        background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
      >
        How To Participate
      </GradientTypography>
      <br />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: '2fr 1fr',
          },
          gap: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Instructions />
        <ContactUs />
      </Box>
    </Container>

    <Artwork />
  </Box>
);

const ContactUs = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'relative',
        aspectRatio: '650/660',
        width: '100%',
      }}
    >
      <ResponsiveImage src="/marketing/boy.png" alt="Boy" />
    </Box>
    <Typography
      variant="body2"
      fontWeight={700}
      color={'text.blue.light'}
      sx={{ pt: 1 }}
      gutterBottom
    >
      Need More Help?
    </Typography>
    <Button
      variant="arcade"
      color="warning"
      sx={{ minWidth: { xs: 150, sm: 250 } }}
      href={routes.contact.path()}
    >
      Contact Us
    </Button>
  </Box>
);

const Instructions = () => (
  <Box>
    <Instruction
      title="Earn Tokens"
      description="Earn tokens by playing games and completing challenges. The more tokens you earn, the better your chances are to win!"
    />
    <Line />
    <Instruction
      title="Participate in Raffles"
      description="Use your tokens to enter raffles for a chance to win amazing prizes! The more tokens you use, the better your chances are to win!"
    />
    <Line />
    <Instruction
      title="Redeem Prizes"
      description="If you win, you can redeem your prize and we'll ship it to you for free! It's that easy!"
    />
  </Box>
);

const Instruction: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <Box
    display="flex"
    flexDirection="row"
    gap={{ xs: 2, sm: 3, md: 4 }}
    alignItems="center"
  >
    <Dot />
    <Box>
      <Typography typography={{ xs: 'h6', sm: 'h5' }} color={'text.blue.dark'}>
        {title}
      </Typography>
      <Typography
        typography={{ xs: 'body2', sm: 'body1' }}
        color={'text.blue.light'}
        fontWeight={{ xs: 700, sm: 700 }}
      >
        {description}
      </Typography>
    </Box>
  </Box>
);

const Dot: React.FC<{ invisible?: boolean }> = ({ invisible }) => (
  <Box
    sx={{
      visibility: invisible ? 'hidden' : 'visible',
      borderRadius: '50%',
      minHeight: invisible ? undefined : { xs: 40, sm: 48, md: 64 },
      minWidth: { xs: 40, sm: 48, md: 64 },
      background: (theme) => theme.palette.primary.gradient,
    }}
  />
);

const Line = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    maxWidth="fit-content"
  >
    <Dot invisible />
    <Box
      sx={{
        borderRadius: 10,
        my: { xs: -6, sm: -4 },
        height: { xs: 120, sm: 140, md: 160 },
        zIndex: -1,
        width: 6,
        background: (theme) => theme.palette.primary.gradient,
      }}
    />
  </Box>
);

const Artwork = () => (
  <>
    <ConfettiLeft />
    <PresentLeft />
    <GiftBoxRight />
    <RedTicketRight />
  </>
);

const ConfettiLeft = () => (
  <Box
    sx={{
      top: { xs: -300, sm: -400, md: -400 },
      left: { xs: -50, sm: -30, md: -20, lg: -10, xl: 0 },
      position: 'absolute',
      aspectRatio: '381/801',
      height: { xs: '70%', sm: '80%', md: '85%', lg: '90%' },
    }}
  >
    <FillImage src="/marketing/confetti-left.png" alt="Confetti " />
  </Box>
);

const PresentLeft = () => (
  <Box
    sx={{
      position: 'absolute',
      aspectRatio: '355/554',
      height: {
        xs: '25%',
        mobile1: '30%',
        sm: '37.5%',
        md: '40%',
        lg: '45%',
        xl: '50%',
      },
      left: 0,
      bottom: { xs: -100, sm: -150, md: -200 },
    }}
  >
    <FillImage src="/marketing/present-left.png" alt="Present" />
  </Box>
);

const GiftBoxRight = () => (
  <Box
    sx={{
      position: 'absolute',
      aspectRatio: '361/719',
      height: { xs: '30%', sm: '40%', md: '50%' },
      right: 0,
      top: { xs: -100, sm: -150, md: -200 },
    }}
  >
    <FillImage src="/marketing/giftbox-1-right.png" alt="Gift Box" />
  </Box>
);

const RedTicketRight = () => (
  <Box>
    <Box
      sx={{
        position: 'absolute',
        aspectRatio: '208/278',
        height: {
          xs: '16%',
          sm: '18%',
          md: '20%',
        },
        right: 0,
        bottom: { xs: -40, sm: -50, md: -60 },
      }}
    >
      <FillImage src="/marketing/red-ticket-right.png" alt="Red Ticket" />
    </Box>
  </Box>
);
