import { helpInventory } from '@worksheets/ui/components/help';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory',
  description:
    'Find answers to questions about the inventory on Charity Games. Learn about your digital and physical prizes.',
};

export default async function Page() {
  return (
    <>
      <HelpScreen
        title={'Inventory'}
        description={
          "The inventory contains all the items you've won or purchased on the Charity Games platform. The more you play, the more items you'll collect!"
        }
        qa={helpInventory}
      />
      <FAQPageLdJson qa={helpInventory} />
    </>
  );
}
