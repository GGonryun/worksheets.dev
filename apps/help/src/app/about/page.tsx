import { AboutScreen } from '@worksheets/ui/pages/about';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Charity Games provides access to free online HTML browser games. Every game donates money to charitable causes. Play your favorite games and help make the world a better place.',
};

export default async function Page() {
  return <AboutScreen />;
}
