import { Box } from '@mui/material';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
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

    <RafflesSection />

    <PrizesSection />

    <InstructionsSection />

    {/* <SocialProofSection />
    <RulesSection /> */}
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

// Sample query for soonest expiring raffle!
//
// db.raffle.findMany({
//   where: {
//     status: 'ACTIVE',
//   },
//   take: 1,
//   select: {
//     id: true,
//     expiresAt: true,
//     prize: {
//       select: {
//         id: true,
//         name: true,
//         imageUrl: true,
//         type: true,
//       },
//     },
//   },
// }),
