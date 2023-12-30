import Paper from '@mui/material/Paper';
import { TitleText } from './title-text';
import { CharityGroup } from '@worksheets/ui/icons';
import { styled } from '@mui/material/styles';

export const ReasonsSection = () => (
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
    <TitleText variant="h2">Why work with us?</TitleText>
    <ul style={{ margin: 0 }}>
      <ListItem>Instant access to our global player base.</ListItem>
      <ListItem>Dedicated help from our developer support team.</ListItem>
      <ListItem>
        Build your brand and reputation as a socially responsible company.
      </ListItem>
      <ListItem>
        Get your game in front of thousands of players, world-wide.
      </ListItem>
    </ul>

    <CharityGroup sx={{ fontSize: '8rem' }} />
  </Paper>
);

const ListItem = styled('li')(({ theme }) => ({
  fontFamily: theme.typography.mPlus1p.fontFamily,
  fontSize: '1.1rem',
}));
