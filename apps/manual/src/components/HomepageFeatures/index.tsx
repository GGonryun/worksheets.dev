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
    title: 'Orchestrate complex workflows',
    Svg: require('@site/static/img/icon-1.svg').default,
    description: (
      <>
        Worksheets makes it easy for developers to integrate with applications,
        parallelize operations, automate repetitive tasks, and more
      </>
    ),
  },
  {
    title: 'Integrate with your favorite applications',
    Svg: require('@site/static/img/icon-3.svg').default,
    description: (
      <>
        Worksheets provides a growing library of applications to connect to. If
        you can't find what you need, you can always write your own.
      </>
    ),
  },
  {
    title: 'Run tasks of any duration effortlessly',
    Svg: require('@site/static/img/icon-2.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: 'Prebuilt templates',
    Svg: require('@site/static/img/icon-0.svg').default,
    description: (
      <>
        Explore a wider ecosystem, fostering adaptability and the ability to
        stay ahead in a rapidly evolving business landscape
      </>
    ),
  },
  {
    title: 'API-first design',
    Svg: require('@site/static/img/icon-5.svg').default,
    description: (
      <>
        Worksheets provides an unopinionated framework that makes it easy to
        integrate into your stack.
      </>
    ),
  },
  {
    title: 'Intuitive YAML Syntax',
    Svg: require('@site/static/img/icon-4.svg').default,
    description: (
      <>
        Worksheets can use conditional logic, iterate over tables or lists of
        data of data, execute other worksheets, parallelize multiple operations,
        and more
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
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
