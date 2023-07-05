import { useRouter } from 'next/router';
import styles from './home-page.module.css';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const { push } = useRouter();
  useEffect(() => {
    push('/login');
  }, [push]);
  return <div className={styles['container']}></div>;
}
