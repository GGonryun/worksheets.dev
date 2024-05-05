import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicArcadeScreen } from '@worksheets/ui/pages/arcade';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { playSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  topGames: BasicGameInfo[];
  allGames: BasicGameInfo[];
  newGames: BasicGameInfo[];
  featured: {
    primary: BasicGameInfo[];
    secondary: BasicGameInfo;
  };
  categories: BasicCategoryInfo[];
};

const Page: NextPageWithLayout<Props> = ({ seo, ...props }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicArcadeScreen {...props} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  try {
    const arcade = await trpc.public.arcade.details.fetch(undefined);
    const categories = await trpc.public.categories.list.fetch({
      showEmpty: false,
    });

    return {
      props: {
        ...arcade,
        seo: playSeo,
        categories,
      },
    };
  } catch (error) {
    console.error('Failed to fetch arcade data', error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
