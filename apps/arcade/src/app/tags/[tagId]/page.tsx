import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import {
  CategoryScreen,
  CategoryScreenProps,
} from '@worksheets/ui/pages/category';
import { Boundary } from '@worksheets/ui/suspense/server';
import { notFound } from 'next/navigation';

export type CategoryPageProps = { params: { tagId: string } };

const getStaticProps = async (tagId: string): Promise<CategoryScreenProps> => {
  try {
    const trpc = await createStaticTRPC();
    const { tag, games, related } = await trpc.public.categories.find.fetch({
      tagId,
    });

    return {
      name: tag.name,
      description: tag.description,
      games,
      relatedCategories: related,
    };
  } catch (error) {
    notFound();
  }
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { name } = await getStaticProps(params.tagId);
  return {
    title: `${name}`,
    description: `Play ${name} online for free on Charity Games. The easiest way to make a difference. Play offline and online games for charity.`,
  };
}

export async function generateStaticParams() {
  const trpc = await createStaticTRPC();
  const tags = await trpc.public.categories.list.fetch({ showEmpty: true });

  return tags.map((tag) => ({
    tagId: tag.id,
  }));
}

export default async function Page({ params }: CategoryPageProps) {
  const props = await getStaticProps(params.tagId);
  return (
    <Boundary>
      <CategoryScreen {...props} />
    </Boundary>
  );
}
