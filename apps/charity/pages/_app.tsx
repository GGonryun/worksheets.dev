import Head from 'next/head';
import './styles.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import { AppPropsWithLayout } from '@worksheets/util-next';
import { trpc } from '@worksheets/trpc-charity';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';
import * as FullStory from '@fullstory/browser';
import { NewsletterPopupContainer } from '../components/NewsletterPopupContainer';
import { CookieConsentPopup } from '@worksheets/ui-cookie-consent';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Charity.Games</title>
      </Head>

      <ThemeProvider theme={theme}>
        <main className="app">{getLayout(<Component {...pageProps} />)}</main>
        <NewsletterPopupContainer />
        <CookieConsentPopup />
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
