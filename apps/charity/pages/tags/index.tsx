import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { CategoriesScreen } from '@worksheets/ui/pages/category';
import { BasicCategoryInfo } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { categoriesSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  categories: BasicCategoryInfo[];
};

const Page: NextPageWithLayout<Props> = ({ seo, categories }) => (
  <>
    <NextSeo {...seo} />
    <CategoriesScreen categories={categories} />
  </>
);

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);
  const categories = await trpc.public.categories.list.fetch({});

  const seo = categoriesSeo;

  return { props: { categories, seo } };
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
