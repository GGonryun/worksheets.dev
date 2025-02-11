import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import {
  CategoriesScreen,
  CategoriesScreenProps,
} from '@worksheets/ui/pages/category';
import { Boundary } from '@worksheets/ui/suspense/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Categories',
  description: `Find and play your favorite html and browser games for free on Charity Games. The easiest way to donate to charity.`,
};

const getStaticProps = async (): Promise<CategoriesScreenProps> => {
  const trpc = await createStaticTRPC();
  const categories = await trpc.public.categories.list.fetch({});
  return { categories };
};

export default async function Page() {
  const data = await getStaticProps();
  // Forward fetched data to your Client Component
  return (
    <Boundary>
      <CategoriesScreen {...data} />
    </Boundary>
  );
}
