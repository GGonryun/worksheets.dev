import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Typesafe SDKs',
    Svg: require('@site/static/img/icon-1.svg').default,
    description: (
      <>
        Our SDK provides a typesafe interface for interacting with external
        apps. No more guessing what the response will look like. No more
        wondering what the parameters are. No more sifting through
        documentation.
      </>
    ),
  },
  {
    title: 'Analytics and Monitoring',
    Svg: require('@site/static/img/icon-2.svg').default,
    description: (
      <>
        Monitor your integrations in real time. See how many requests you're
        making, how long they take, and how much they cost. Gain insight into
        how your application communicates with other services and swap out
        integrations with ease.
      </>
    ),
  },
  {
    title: 'Security and Compliance',
    Svg: require('@site/static/img/icon-0.svg').default,
    description: (
      <>
        When you download an external SDK, their vulnerabilities become your
        vulnerabilities. With Worksheets, we proxy those requests so that you
        only have to worry about your own code.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{ padding: 30 }}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div
          className="row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <div
            className="text--center padding-horiz--md"
            style={{ paddingBottom: '20px' }}
          >
            <h3>Stop integrating APIs and SDKs. Start integrating APPs.</h3>
          </div>
          <img src="/img/worksheets-basic-640.gif" alt="Worksheets" />
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
