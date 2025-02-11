import { CssBaseline } from '@mui/material';

export const BaseLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <link rel="preconnect" href="https://edge.fullstory.com" />
      <link rel="preconnect" href="https://cdn.charity.games" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="themeColor" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="HandheldFriendly" content="true" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
      />

      <CssBaseline />

      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  );
};
