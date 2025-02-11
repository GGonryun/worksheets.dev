import { helpPrizes } from '@worksheets/ui/components/help';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prizes',
  description:
    'Find answers to questions about prizes on Charity Games. Learn about redeeming tokens for real world prizes.',
};

export default async function Page() {
  return (
    <>
      <HelpScreen
        title={'Prizes & Rewards'}
        description={
          'Get instant prizes and rewards. The Prize Wall is a great way to earn instant prizes and rewards. Find out how to earn prizes and how to win prizes.'
        }
        qa={helpPrizes}
      />
      <FAQPageLdJson qa={helpPrizes} />
    </>
  );
}
