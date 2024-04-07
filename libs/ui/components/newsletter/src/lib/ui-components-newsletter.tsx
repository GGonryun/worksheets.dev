import styles from './ui-components-newsletter.module.scss';

/* eslint-disable-next-line */
export interface UiComponentsNewsletterProps {}

export function UiComponentsNewsletter(props: UiComponentsNewsletterProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UiComponentsNewsletter!</h1>
    </div>
  );
}

export default UiComponentsNewsletter;
