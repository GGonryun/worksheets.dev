import { routes } from '@worksheets/routes';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicApplyReferralCode } from '@worksheets/ui/pages/login';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof DynamicApplyReferralCode>;

const Page: NextPageWithLayout<Props> = ({ referralCode, raffleId }) => (
  <DynamicApplyReferralCode referralCode={referralCode} raffleId={raffleId} />
);

export const getServerSideProps = (async (ctx) => {
  // if params doesn't have referral code redirect to home.
  const code = ctx.params?.code as string | undefined;
  const raffleId = ctx.query?.r as string | undefined;
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
      raffleId: raffleId ?? null,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
