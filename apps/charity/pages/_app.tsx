import Head from 'next/head';
import './styles.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import { AppPropsWithLayout } from '@worksheets/util-next';
import { trpc } from '@worksheets/trpc-charity';

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
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
