import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicItemsScreen } from '@worksheets/ui/pages/items';
import { ItemSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { itemsSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  items: ItemSchema[];
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo {...props.seo} />
      <DynamicItemsScreen items={props.items} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  try {
    const items = await trpc.public.items.list.fetch();

    return {
      props: {
        items,
        seo: itemsSeo,
      },
    };
  } catch (error) {
    console.error(`Failed to load items`, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
