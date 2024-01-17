import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { DynamicLayout } from '../../dynamic/dynamic-layout';

type Props = {
  referralCode: string;
};

const DynamicApplyReferralCode = dynamic(
  () => import('../../dynamic/apply-referral-code'),
  {
    ssr: false,
  }
);

const Page: NextPageWithLayout<Props> = ({ referralCode }) => (
  <DynamicApplyReferralCode referralCode={referralCode} />
);

export const getServerSideProps = (async (ctx) => {
  // if params doesn't have referral code redirect to home.
  const code = ctx.params?.code as string | undefined;
  if (!code) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      referralCode: code,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
