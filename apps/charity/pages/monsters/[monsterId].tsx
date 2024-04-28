import { parseMonsterId } from '@worksheets/data/mobs';
import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicMonsterScreen } from '@worksheets/ui/pages/monsters';
import { MonsterSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { monsterSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  monster: MonsterSchema;
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo {...props.seo} />
      <DynamicMonsterScreen monster={props.monster} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  try {
    const { params } = ctx;

    const trpc = await createStaticTRPC(ctx);

    const monsterId = parseMonsterId(params?.monsterId);

    const monster = await trpc.public.monsters.find.fetch(monsterId);

    const seo = monsterSeo(monster);

    return {
      props: {
        monster,
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

  const monsters = await trpc.public.monsters.list.fetch();

  return {
    paths: monsters.map((monster) => ({
      params: {
        monsterId: monster.id.toString(),
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<{ monsterId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
