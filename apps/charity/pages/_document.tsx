import { CssBaseline } from '@mui/material';
import {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { AdSenseScript } from '../scripts';
import { ldJson } from '../util/seo';

interface DocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactNode[];
}

export default function MyDocument(props: DocumentProps) {
  return (
    <Html lang="en">
      <CssBaseline />
      <AdSenseScript />
      <Head title="Charity Games">
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
        <script
          type="application/ld+json"
          id="ld-json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ldJson),
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
