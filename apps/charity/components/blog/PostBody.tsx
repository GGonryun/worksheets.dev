import { FC } from 'react';
import styles from './PostBody.module.scss';

export const PostBody: FC<{ content: string }> = ({ content }) => {
  return (
    <div
      className={styles['markdown']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
