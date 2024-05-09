import { Login } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { useSession } from 'next-auth/react';

export const CreateAccountContainer = () => {
  const session = useSession();
  if (session.status !== 'unauthenticated') {
    return null;
  }

  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        borderRadius: (theme) => theme.shape.borderRadius,
        color: (theme) => theme.palette.text.blue.dark,
        backgroundColor: (theme) => theme.palette.background.soft,
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'unset' },
        p: 2,
        px: { xs: 2, sm: 4 },
        gap: { xs: 1, sm: 2 },
      }}
    >
      <CharityGamesLogo size={72} />
      <Column>
        <Typography
          typography={{ xs: 'body1', sm: 'h6' }}
          fontWeight={{ xs: 700, sm: 700 }}
        >
          Get the most out of Charity Games.
        </Typography>
        <Typography typography="body2" gutterBottom>
          Enter random giveaways and win prizes for playing games.
        </Typography>
        <Button
          variant="arcade"
          size="small"
          color="warning"
          href={routes.login.path()}
          startIcon={<Login />}
          sx={{
            mt: 0.5,
            width: 'fit-content',
          }}
        >
          Sign Up Now
        </Button>
      </Column>
    </Row>
  );
};
