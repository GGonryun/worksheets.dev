import { Box, Button, Container, Paper } from '@mui/material';
import { urls } from '@worksheets/ui-games';
import { signIn } from 'next-auth/react';
import { ArrowBack, GitHub } from '@mui/icons-material';
import { useRouter } from 'next/router';
import {
  SmallHeaderText,
  SubHeaderText,
  CaptionText,
  SecondaryLink,
} from '@worksheets/ui-charity';

const Page = () => {
  const { back } = useRouter();
  return (
    <Container
      sx={{
        p: 3,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Button
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
        }}
        startIcon={
          <ArrowBack
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          />
        }
        onClick={() => back}
      >
        <SmallHeaderText color="primary.contrastText">Back</SmallHeaderText>
      </Button>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box pb={2}>
          <SubHeaderText>Log in</SubHeaderText>
        </Box>
        <CaptionText>Connect to your Charity.Games account</CaptionText>
        <CaptionText>
          <SecondaryLink href={`${urls.relative.faq}#do-i-need-an-account`}>
            <b>Do I need an account?</b>
          </SecondaryLink>
        </CaptionText>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          size="small"
          startIcon={<GitHub />}
          sx={{ mt: 2, textTransform: 'none' }}
          onClick={() => signIn('github', { callbackUrl: urls.relative.home })}
        >
          <CaptionText sx={{ color: 'inherit' }}>Login with GitHub</CaptionText>
        </Button>
      </Paper>
    </Container>
  );
};

export default Page;
