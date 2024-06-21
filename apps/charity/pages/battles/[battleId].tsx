import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicBattleScreen } from '@worksheets/ui/pages/battles';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { bossBattleSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicBattleScreen />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  try {
    const { params } = ctx;

    const trpc = await createStaticTRPC(ctx);

    const battleId = Number(params?.battleId);

    const battle = await trpc.maybe.battles.find.fetch(battleId);

    const seo = bossBattleSeo(battle);

    return {
      props: {
        seo,
      },
    };
  } catch (error) {
    console.error(`Failed to load monster `, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const battles = await trpc.maybe.battles.list.fetch();

  return {
    paths: battles.map((battle) => ({
      params: {
        battleId: battle.id.toString(),
      },
    })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths<{ battleId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
