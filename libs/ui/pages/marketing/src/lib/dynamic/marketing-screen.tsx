import { Box } from '@mui/material';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import dynamic from 'next/dynamic';

import { FooterSection } from '../components/footer-section';
import { HeroSection } from '../components/hero-section';
import { InstructionsSection } from '../components/instructions-section';
import { PrizesSection } from '../components/prizes-section';
import { RulesSection } from '../components/rules-section';
import { SocialProofSection } from '../components/social-proof-section';
import { RafflesSectionContainer } from './dynamic-raffles-section';

const MarketingScreen = () => (
  <Box>
    <HeroSection />

    <RafflesSectionContainer />

    <PrizesSection />

    <InstructionsSection />

    <SocialProofSection
      moneyRaised={20}
      prizesWon={2}
      winners={[
        {
          username: 'aModestDuck',
          tweetUrl: 'https://twitter.com/aModestDuck',
        },
        {
          username: 'bringbackmcrib',
          tweetUrl:
            'https://twitter.com/bringbackmcrib/status/1789170921598505072',
        },
      ]}
    />

    <RulesSection />

    <FooterSection />
  </Box>
);

const MarketingScreenContainer = () => <MarketingScreen />;

export const DynamicMarketingScreen = dynamic(
  () => Promise.resolve(MarketingScreenContainer),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
