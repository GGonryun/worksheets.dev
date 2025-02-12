import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ColoredGestureThumbsUp } from '@worksheets/icons/youtube';
import { routes } from '@worksheets/routes';

export const GameSubmissionSuccessScreen = () => {
  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          my: 12,
          mx: 4,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 1,
        }}
      >
        <ColoredGestureThumbsUp
          sx={{
            height: 164,
            width: 164,
          }}
        />
        <Typography
          variant="h3"
          fontSize={{
            xs: '2rem',
            sm: '3rem',
          }}
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.4rem',
            mb: 4,
            color: 'error.main',
          }}
        >
          Thank You!
        </Typography>

        <Typography variant="body1" textAlign="center">
          Your submission has been received and we'll be in touch soon.
        </Typography>
        <Typography variant="body3" textAlign="center">
          If you have any questions, please{' '}
          <Link href={routes.contact.path()}>contact us</Link>
        </Typography>
        <Button
          href={routes.account.path()}
          variant="arcade"
          color="error"
          size="large"
          endIcon={<ArrowRightAltIcon />}
          sx={{
            mt: 4,
            width: 'fit-content',
          }}
        >
          My Submissions
        </Button>
      </Paper>
    </Container>
  );
};
