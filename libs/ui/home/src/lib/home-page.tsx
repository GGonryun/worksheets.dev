import styles from './home-page.module.css';
import { Button } from '@mui/material';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  return (
    <div className={styles['container']}>
      <h1>Home Page Coming Soon</h1>
      <Button href="/login" variant="contained">
        Login
      </Button>
    </div>
  );
}
