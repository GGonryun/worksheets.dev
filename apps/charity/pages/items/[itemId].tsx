import { parseItemId } from '@worksheets/data/items';
import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicItemScreen } from '@worksheets/ui/pages/items';
import { ItemSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { itemSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  item: ItemSchema;
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo {...props.seo} />
      <DynamicItemScreen item={props.item} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  try {
    const { params } = ctx;

    const trpc = await createStaticTRPC(ctx);

    const itemId = parseItemId(params?.itemId);

    const item = await trpc.public.items.find.fetch(itemId);

    const seo = itemSeo(item);

    return {
      props: {
        item,
        seo,
      },
    };
  } catch (error) {
    console.error(`Failed to load item`, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const items = await trpc.public.items.list.fetch();

  return {
    paths: items.map((item) => ({
      params: {
        itemId: item.id.toString(),
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<{ itemId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
