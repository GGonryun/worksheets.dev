import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { NextSeo } from 'next-seo';

export default function Custom404() {
  return (
    <>
      <NextSeo noindex title="Charity Games - 429" />
      <ErrorScreen
        title="404"
        header="Too Many Requests"
        message="You have made too many requests to the server. Please try again later"
      />
    </>
  );
}
