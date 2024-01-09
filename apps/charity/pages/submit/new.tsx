import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';

import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next/types';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';

type Props = {
  user: User;
};

const DynamicCreateGameSubmissionContainer = dynamic(
  () => import('../../dynamic/create-game-submission'),
  {
    ssr: false,
  }
);

const Page: NextPageWithLayout<Props> = () => {
  return <DynamicCreateGameSubmissionContainer />;
};

export const getServerSideProps = (async (context) => {
  const session = await getToken(context);
  const user = session?.user as User;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
