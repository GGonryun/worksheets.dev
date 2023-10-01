import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Analytics } from '@vercel/analytics/react';
import * as FullStory from '@fullstory/browser';

import styles from './index.module.css';
import { SERVICE_SETTINGS } from '@worksheets/data-access/server-settings';

if (typeof window !== 'undefined') {
  FullStory.init(SERVICE_SETTINGS.FULLSTORY);
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Link
              className="button button--secondary button--lg"
              target="_self"
              to={'https://app.worksheets.dev/login'}
            >
              Sign up for free - 1 min 🚀
            </Link>
            <Link className="button button--secondary button--lg" to="/intro">
              Learn more - 5 min 📖
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Analytics />

      <Layout
        title={`Welcome to ${siteConfig.title}`}
        description="Documentation site for Worksheets.dev"
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  );
}
