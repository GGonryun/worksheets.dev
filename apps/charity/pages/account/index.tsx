import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { NextSeo } from 'next-seo';
import { AccountScreenContainer } from '../../containers/account-screen-container';
import { BasicInformationForm } from '@worksheets/ui/pages/account';
import { GetServerSideProps } from 'next';
import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { profileSeo } from '../../util/seo';

type Props = {
  profile: BasicInformationForm | null;
};

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <NextSeo noindex {...profileSeo} />
      <AccountScreenContainer {...props} submissions={[]} />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  const profile = await trpc.profile.get.fetch();

  await trpc.profile.terms.get.prefetch();

  return {
    props: { profile, trpcState: trpc.dehydrate() },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
