import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@worksheets/util-next';
import { MarketingLayout } from '@worksheets/ui/marketing';
import { ApplicationDetailsPage } from '@worksheets/ui/applications';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const appId = query.appId as string;
  return <ApplicationDetailsPage appId={appId} resource="connections" />;
};

Page.getLayout = (page) => {
  return <MarketingLayout>{page}</MarketingLayout>;
};

export default Page;