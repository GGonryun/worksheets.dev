import { CssBaseline } from '@mui/material';
import {
  documentGetInitialProps,
  DocumentHeadTags,
} from '@mui/material-nextjs/v13-pagesRouter';
import {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { AdSenseScript } from '../scripts';

interface DocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactNode[];
}

export default function MyDocument(props: DocumentProps) {
  return (
    <Html lang="en">
      <CssBaseline />
      <AdSenseScript />
      <Head title="Charity Games">
        <DocumentHeadTags {...props} />
        <link rel="preconnect" href="https://edge.fullstory.com" />
        <link rel="preconnect" href="https://cdn.charity.games" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Charity.Games" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="true" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
