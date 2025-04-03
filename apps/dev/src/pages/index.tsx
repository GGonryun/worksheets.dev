import { useSession } from 'next-auth/react';

import styles from './index.module.scss';

export function Index() {
  const auth = useSession();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      Hello! {auth.data?.user?.email ?? 'not-logged-in'}
    </div>
  );
}

export default Index;
