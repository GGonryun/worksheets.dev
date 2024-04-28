import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicMonstersScreen } from '@worksheets/ui/pages/monsters';
import { MonsterSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { monstersSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  monsters: MonsterSchema[];
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo {...props.seo} />
      <DynamicMonstersScreen monsters={props.monsters} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  try {
    const monsters = await trpc.public.monsters.list.fetch();

    return {
      props: {
        monsters,
        seo: monstersSeo,
      },
    };
  } catch (error) {
    console.error(`Failed to load monsters `, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
