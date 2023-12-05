import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FC } from 'react';

export const CategoryDoesNotExistScreen: FC<{ tag: string }> = ({ tag }) => {
  return (
    <AbsolutelyCentered>
      <Paper
        sx={{
          padding: 4,
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          maxWidth: 600,
          m: 2,
          mb: 14,
        }}
      >
        <Typography variant="h4">We couldn&apos;t find anything.</Typography>
        <Typography>
          <b>{tag}</b> does not exist in our list of categories.
        </Typography>
        <Button
          href="/tags"
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          endIcon={<ArrowRightIcon />}
          sx={{
            borderRadius: 6,
          }}
        >
          <Typography
            fontFamily={(theme) => theme.typography.dangrek.fontFamily}
          >
            <b>All Tags</b>
          </Typography>
        </Button>
      </Paper>
    </AbsolutelyCentered>
  );
};
