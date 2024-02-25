import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DeveloperScreen } from '@worksheets/ui/pages/developer';
import { BasicGameInfo, DeveloperSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { developerSeo } from '../../util/seo';

type Props = {
  developer: DeveloperSchema;
  games: BasicGameInfo[];
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ developer, games, seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DeveloperScreen {...developer} games={games} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createStaticTRPC(ctx);

  const developerId = params?.developerId as string;

  if (!developerId) {
    return {
      notFound: true,
    };
  }

  const { developer, games } = await trpc.public.developers.find.fetch({
    developerId,
  });

  return { props: { developer, games, seo: developerSeo(developer) } };
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const devs = await trpc.public.developers.list.fetch();

  return {
    paths: devs.map((dev) => ({
      params: {
        developerId: dev.id,
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<{ developerId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
