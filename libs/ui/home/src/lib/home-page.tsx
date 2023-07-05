import { useRouter } from 'next/router';
import styles from './home-page.module.css';
import { useTimeout } from '@worksheets/ui/common';
import { CircularProgress } from '@mui/material';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  const { push } = useRouter();
  useTimeout(() => {
    push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 1000);
  return (
    <div className={styles['container']}>
      <CircularProgress size={100} />
    </div>
  );
}
