import { Markdown, MarkdownText } from '@worksheets/ui-core';
import { FC } from 'react';
import { CustomPaper } from './custom-paper';
import { Button, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';

export type CharityDescriptionProps = {
  description: MarkdownText;
};

export const CharityDescription: FC<CharityDescriptionProps> = ({
  description,
}) => {
  return (
    <CustomPaper>
      <Typography padding={0} component="div">
        <Markdown
          text={description}
          sx={{ '& h2:first-child': { marginTop: 0 } }}
        />
      </Typography>
      <Button
        variant="contained"
        color="error"
        href="/"
        endIcon={<ArrowRight sx={{ ml: -0.5 }} />}
        sx={{
          mt: 2,
          borderRadius: 6,
          width: { xs: '100%', sm: 'fit-content' },
          px: { xs: 1, sm: 3 },
          py: { xs: 0.5, sm: 1 },
        }}
      >
        <Typography
          fontWeight={900}
          sx={{
            fontSize: { xs: 16, sm: 18 },
          }}
        >
          Explore All Games
        </Typography>
      </Button>
    </CustomPaper>
  );
};
