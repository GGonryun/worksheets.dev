import { NextPageWithLayout } from '@worksheets/util-next';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { LayoutContainer } from '../containers/layout-container';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const id = query.id as string;

  return <HelpScreen defaultOpen={id} />;
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
