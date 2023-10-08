import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export type MobileLayoutProps = {
  content: ReactNode;
  header: ReactNode;
  footer?: ReactNode;
  backgroundColor?: string;
};

export const MobileLayout: FC<MobileLayoutProps> = ({
  header,
  footer,
  content,
  backgroundColor,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor,
      }}
    >
      {header}
      <Box
        sx={{
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width: '95%',
          height: '90%',
          overflow: 'auto',
          maxWidth: 600,
          maxHeight: 1000,
        }}
      >
        {content}
      </Box>
      {footer}
    </Box>
  );
};
