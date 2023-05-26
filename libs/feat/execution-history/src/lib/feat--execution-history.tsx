import styles from './feat--execution-history.module.css';

/* eslint-disable-next-line */
export interface FeatExecutionHistoryProps {}

export function FeatExecutionHistory(props: FeatExecutionHistoryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatExecutionHistory!</h1>
    </div>
  );
}

export default FeatExecutionHistory;
