import { Container } from '@mui/material';

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
      Contribution Screen
    </Container>
  );
}
