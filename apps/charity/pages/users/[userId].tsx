import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicUserScreen } from '@worksheets/ui/pages/users';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { userSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  userId: string;
};

const Page: NextPageWithLayout<Props> = ({ seo, userId }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicUserScreen userId={userId} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;

  const userId = params?.userId;

  if (!userId || typeof userId !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      seo: userSeo(userId),
      userId,
    },
  };
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const users = await trpc.public.users.list.fetch();

  return {
    paths: users.map((user) => ({
      params: {
        userId: user.id,
      },
    })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths<{ userId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
