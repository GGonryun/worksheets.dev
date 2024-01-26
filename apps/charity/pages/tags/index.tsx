import { tagSchemas } from '@worksheets/data-access/charity-games';
import { DynamicLayout } from '@worksheets/ui/layout';
import { CategoriesScreen } from '@worksheets/ui/pages/category';
import { BasicCategoryInfo } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { tagsSeo } from '../../util/seo';

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

export const getServerSideProps = (async ({ params }) => {
  const categories = tagSchemas.map((category) => ({
    name: category.name,
    id: category.id,
    image: category.iconUrl,
  }));

  const seo = tagsSeo;

  return { props: { categories, seo } };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
