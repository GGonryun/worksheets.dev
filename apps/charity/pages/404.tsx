import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { NextSeo } from 'next-seo';

export default function Custom404() {
  return (
    <>
      <NextSeo noindex title="Charity Games - 404" />
      <ErrorScreen
        title="404"
        header="Not Found"
        message="This page could not be found. If the problem persists, please contact us."
      />
    </>
  );
}
