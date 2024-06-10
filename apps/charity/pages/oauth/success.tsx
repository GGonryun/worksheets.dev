import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // close this tab.
    window.close();
  }, []);
  return (
    <>
      <NextSeo noindex title="Charity Games - OAuth Success" />

      <LoadingScreen message="Your account was connected successfully, you may now close this tab if it does not close automatically" />
    </>
  );
}
