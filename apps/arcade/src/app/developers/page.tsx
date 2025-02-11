import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developers',
  description:
    'Learn more about the developers behind your favorite games on Charity Games.',
};

export default async function Page() {
  return <UnderConstruction />;
}
