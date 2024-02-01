import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DeveloperScreen } from '@worksheets/ui/pages/developer';
import { BasicGameInfo, DeveloperSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createServerSideTRPC(ctx);
  const developerId = params?.developerId as string;

  if (!developerId) {
    return {
      notFound: true,
    };
  }

  const { developer, games } = await trpc.developers.find.fetch({
    developerId,
  });

  return { props: { developer, games, seo: developerSeo(developer) } };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
