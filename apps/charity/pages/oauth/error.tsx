import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

export default function Page() {
  const router = useRouter();
  const message = router.query.message as string | undefined;
  return (
    <>
      <NextSeo noindex title="Charity Games - Error" />

      <ErrorScreen
        title="500"
        header="Internal Server Error"
        message={
          message ??
          'Something unexpected happened on our end and our team has been notified. If the problem persists, please contact us.'
        }
      />
    </>
  );
}
