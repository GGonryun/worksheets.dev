import { Box } from '@mui/material';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { hoursFromNow } from '@worksheets/util/time';
import dynamic from 'next/dynamic';

import { FooterSection } from '../components/footer-section';
import { HeroSection } from '../components/hero-section';
import { InstructionsSection } from '../components/instructions-section';
import { PrizesSection } from '../components/prizes-section';
import { RafflesSection } from '../components/raffles-section';
import { RulesSection } from '../components/rules-section';
import { SocialProofSection } from '../components/social-proof-section';

const MarketingScreen = () => (
  <Box>
    <HeroSection />

    <RafflesSection raffleExpiration={hoursFromNow(36).getTime()} />

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
