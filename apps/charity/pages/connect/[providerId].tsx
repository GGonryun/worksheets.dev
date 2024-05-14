import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { DynamicConnectionScreen } from '@worksheets/ui/pages/integrations';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseAPIKeyIntegrationProvider } from '@worksheets/util/integrations';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { connectSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();

  const { providerId, state } = query;

  const [pid, valid] = parseAPIKeyIntegrationProvider(providerId);

  if (!pid) {
    return <LoadingScreen />;
  }

  if (!valid) {
    return (
      <ErrorScreen
        message={`Integration Provider ${providerId} is not supported on this screen`}
      />
    );
  }

  return (
    <>
      <NextSeo noindex {...connectSeo(pid)} />
      <DynamicConnectionScreen
        providerId={pid}
        integrationId={state as string | undefined}
      />
    </>
  );
};

export default Page;
