import { Box, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { HeaderText, SubHeaderText } from '../components/Typography';
import { GameCard, TeamCard } from '../components/Cards';
import { Diversity3 } from '@mui/icons-material';
import { SubmissionButton } from '../components/Buttons';

const Page = () => {
  const { data: session } = useSession();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <HeaderText>Dashboard: {session?.user.username}</HeaderText>
      <Box display="flex" justifyContent="space-between">
        <SubHeaderText>Your Teams</SubHeaderText>
        <SubmissionButton
          sx={{
            textTransform: 'none',
          }}
          startIcon={<Diversity3 />}
          href="/teams"
        >
          View All Teams
        </SubmissionButton>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <TeamCard
          name="Official"
          id="b18394h134980"
          subdomain="official"
          growth={32}
          games={2}
          members={2}
        />
        <TeamCard
          name="Test"
          id={'y3799n6c6x8ju1'}
          subdomain="reallylongsubdomainprobably"
          growth={0}
          games={0}
          members={1}
        />
      </Box>
      <SubHeaderText>Your Games</SubHeaderText>
      <Box display="flex" gap={2} flexWrap="wrap">
        <GameCard
          name={'Solitaire'}
          id={'solitaire'}
          team={{
            subdomain: 'official',
            id: 'b18394h134980',
          }}
          growth={0}
          favorites={213}
          status="draft"
        />
        <GameCard
          name={'Word Pack'}
          id={'word-pack'}
          team={{
            subdomain: 'official',
            id: 'b18394h134980',
          }}
          growth={1}
          favorites={2}
          status="archived"
        />
        <GameCard
          name={'Puzzle Words'}
          id={'puzzle-words'}
          team={{
            subdomain: 'official',
            id: 'b18394h134980',
          }}
          growth={23}
          favorites={54}
          status="draft"
        />
        <GameCard
          name={'Emoji War'}
          id={'emoji-war'}
          team={{
            subdomain: 'official',
            id: 'b18394h134980',
          }}
          growth={3}
          favorites={123}
          status="published"
        />
      </Box>
    </Container>
  );
};

export default Page;
