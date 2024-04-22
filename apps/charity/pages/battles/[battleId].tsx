import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicBattleScreen } from '@worksheets/ui/pages/mobs';
import { BossBattleSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { bossBattleSeo } from '../../util/seo';

type Props = {
  battle: BossBattleSchema;
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ seo }) => (
  <>
    <NextSeo {...seo} />
    <DynamicBattleScreen />
  </>
);

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createStaticTRPC(ctx);

  const battleId = params?.battleId as string;

  if (!battleId) {
    return {
      notFound: true,
    };
  }

  const battle = await trpc.maybe.battles.find.fetch(Number(battleId));

  return { props: { battle, seo: bossBattleSeo(battle) } };
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const battles = await trpc.maybe.battles.list.fetch();

  return {
    paths: battles.map((battle) => ({
      params: {
        battleId: battle.battleId.toString(),
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<{ battleId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
