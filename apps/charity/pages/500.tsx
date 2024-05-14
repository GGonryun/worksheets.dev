import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { NextSeo } from 'next-seo';

export default function Custom500() {
  return (
    <>
      <NextSeo noindex title="Charity Games - 500" />

      <ErrorScreen
        title="500"
        header="Internal Server Error"
        message="Something unexpected happened on our end and our team has been notified. If the problem persists, please contact us."
      />
    </>
  );
}
