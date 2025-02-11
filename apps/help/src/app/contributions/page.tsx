import { helpContributions } from '@worksheets/ui/components/help';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute',
  description:
    'There are many ways to help Charity Games. Whether you are a developer, player, teacher, charity, content creator, professional, student, or parent, we would love to hear from you!',
};

export default async function Page() {
  return (
    <>
      <HelpScreen
        title={'Get Involved'}
        description={
          "Embark on a quest to raise money for charity by playing games, and help us spread the word. Whether you're a developer looking to add your game to our platform, or a player looking to help us spread the word, we'd love to hear from you!"
        }
        qa={helpContributions}
      />
      <FAQPageLdJson qa={helpContributions} />
    </>
  );
}
