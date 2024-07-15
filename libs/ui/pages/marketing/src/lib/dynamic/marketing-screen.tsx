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
          tweetUrl: 'https://x.com/bringbackmcrib/status/1789170921598505072',
        },
        {
          username: 'EmanuelEren22',
          tweetUrl: 'https://x.com/EmanuelEren22/status/1800629550969143778',
        },
        {
          username: 'toderasart',
          tweetUrl: 'https://x.com/toderasart/status/1801848346270720165',
        },
        {
          username: 'xx_jayvee',
          tweetUrl: 'https://x.com/xx_jayvee/status/1803080119478817195',
        },
        {
          username: 'carsandtractors',
          tweetUrl: 'https://x.com/carsandtractors/status/1804531024711307485',
        },
        {
          username: 'LyzGrn',
          tweetUrl: 'https://x.com/LyzGrn/status/1805606901389869378',
        },
        {
          username: 'aviloria76',
          tweetUrl: 'https://x.com/aviloria76/status/1812395934313030021',
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
