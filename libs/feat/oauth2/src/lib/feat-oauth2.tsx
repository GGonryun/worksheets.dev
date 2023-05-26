import styles from './feat-oauth2.module.css';

/* eslint-disable-next-line */
export interface FeatOauth2Props {}

export function FeatOauth2(props: FeatOauth2Props) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatOauth2!</h1>
    </div>
  );
}

export default FeatOauth2;
