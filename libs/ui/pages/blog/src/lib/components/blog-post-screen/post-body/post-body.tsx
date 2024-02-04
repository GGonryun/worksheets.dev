import { Box } from '@mui/material';
import { FC } from 'react';

import styles from './post-body.module.scss';

export const PostBody: FC<{ content: string }> = ({ content }) => {
  return (
    <article>
      <Box
        sx={{
          color: (theme) => theme.palette.text.arcade,
        }}
        className={styles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};
