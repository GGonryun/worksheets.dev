import { routes } from '@worksheets/routes';
import { AppLayoutContainer } from '@worksheets/ui/layout';
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
        destination: routes.play.path(),
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
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
