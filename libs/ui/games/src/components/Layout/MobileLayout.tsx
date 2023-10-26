import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export type MobileLayoutProps = {
  content: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  height?: string;
  width?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  backgroundClip?: string;
};

export const MobileLayout: FC<MobileLayoutProps> = ({
  header,
  footer,
  content,
  height,
  width,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundRepeat,
  backgroundPosition,
  backgroundClip,
}) => {
  return (
    <Box
      className="mobile-layout"
      sx={{
        touchAction: 'none',
        userSelect: 'none',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor,
        backgroundImage,
        backgroundSize,
        backgroundRepeat,
        backgroundPosition,
        backgroundClip,
      }}
    >
      {header}
      <Box
        className="mobile-layout-content"
        sx={{
          touchAction: 'none',
          userSelect: 'none',
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width: width ?? '95%',
          height: height ?? '90%',
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
