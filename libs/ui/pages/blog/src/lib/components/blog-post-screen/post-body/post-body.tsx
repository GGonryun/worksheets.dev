import { Box } from '@mui/material';
import { FC } from 'react';

import styles from './post-body.module.scss';

export const PostBody: FC<{ content: string }> = ({ content }) => {
  return (
    <article>
      <Box
        className={styles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};
