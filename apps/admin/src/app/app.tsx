// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Banner } from '@worksheets/common-ui';
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
    <Banner text="Welcome to our admin app." />
    <div className={styles['container']}>
      <NxWelcome title="admin" />
    </div>
    </>
  );
}

export default App;
