import { Box, Container } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { helpFaq, Questions } from '@worksheets/ui/components/qa-section';
import { GradientTypography } from '@worksheets/ui/components/typography';

import { deepDropShadow } from '../style';

export const RulesSection = () => (
  <Box
    sx={{
      position: 'relative',
      py: 14,
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
        flexDirection: 'column',
        position: 'relative',
        gap: { xs: 6, sm: 8 },
      }}
    >
      <GradientTypography
        textAlign={{ xs: 'center', sm: 'left' }}
        typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
        letterSpacing={{ xs: 1, sm: 2, md: 3 }}
        background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
      >
        Frequently Asked Questions
      </GradientTypography>
      <Questions qa={helpFaq} />
    </Container>
    <Artwork />
  </Box>
);

const Artwork = () => (
  <>
    <GiftsLeft />
    <GiftsRight />
  </>
);

const IMAGE_HEIGHT = {
  xs: 200,
  mobile1: 250,
  mobile2: 300,
  sm: 350,
  md: 400,
  lg: 450,
  xl: 550,
};
const GiftsLeft = () => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 5,
      aspectRatio: '285/714',
      height: IMAGE_HEIGHT,
      left: 0,
      bottom: { xs: -100, mobile1: -120, sm: -180, lg: -200, xl: -250 },
    }}
  >
    <FillImage src="/marketing/gifts-2-left.png" alt="gifts" priority />
  </Box>
);

const GiftsRight = () => (
  <Box
    sx={{
      position: 'absolute',
      zIndex: 5,
      aspectRatio: '396/721',
      height: IMAGE_HEIGHT,
      right: 0,
      top: { xs: -125, mobile1: -150, sm: -250 },
    }}
  >
    <FillImage src="/marketing/gifts-2-right.png" alt="gifts" priority />
  </Box>
);
