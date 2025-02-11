import { helpFaq } from '@worksheets/ui/components/qa-section';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Find answers to frequently asked questions about Charity Games. Learn how to play, donate, and get involved.',
};

export default async function Page() {
  return (
    <>
      <HelpScreen
        title={'Frequently Asked Questions'}
        description={
          'Get the answers to the most common questions about Charity Games.'
        }
        qa={helpFaq}
      />
      <FAQPageLdJson qa={helpFaq} />
    </>
  );
}
