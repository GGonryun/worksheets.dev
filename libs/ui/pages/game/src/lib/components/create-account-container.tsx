import { Login } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { Column, Row } from '@worksheets/ui/components/flex';

export const CreateAccountBanner: React.FC<{
  enabled?: boolean;
  href: string;
  description?: string;
  title?: string;
}> = ({
  href,
  enabled = true,
  title = 'Get the most out of Charity Games.',
  description = 'Enter random giveaways and win prizes for playing games.',
}) => {
  if (!enabled) return null;
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
          {title}
        </Typography>
        <Typography typography="body2" gutterBottom>
          {description}
        </Typography>
        <Button
          variant="arcade"
          size="small"
          color="warning"
          href={href}
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
