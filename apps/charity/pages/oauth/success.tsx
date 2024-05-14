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

      <LoadingScreen />
    </>
  );
}
