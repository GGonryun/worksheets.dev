import { LinkRounded } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const AnchoredTitle: React.FC<{
  variant: 'h4' | 'h5';
  id: string;
  text: ReactNode;
  anchorIcon?: ReactNode;
}> = ({ variant, id, text, anchorIcon = <LinkRounded color="primary" /> }) => {
  return (
    <Box id={id} pt={12} mt={-12} display="flex" alignItems="center">
      <Link
        color="default"
        href={'#' + id}
        underline="hover"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Typography variant={variant} fontWeight={900}>
          {text}
        </Typography>
        {anchorIcon}
      </Link>
    </Box>
  );
};
