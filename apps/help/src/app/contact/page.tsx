import { ContactScreen } from '@worksheets/ui/pages/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'If you have any questions, comments, or concerns about Charity Games, please feel free to contact us. We typically respond within 48 hours.',
};

export default async function Page() {
  return <ContactScreen />;
}
