import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicApplyReferralCode } from '@worksheets/ui/pages/login';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';

type Props = {
  referralCode: string;
};

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
