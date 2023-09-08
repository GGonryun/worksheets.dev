import { Box, Container, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import {
  BackgroundColors,
  PaddingStyles,
  selectBackground,
} from '@worksheets/ui/common';
import { FC, ReactNode } from 'react';

export const SectionLayout: FC<
  {
    centered?: boolean;
    children: ReactNode;
    backgroundColor?: BackgroundColors;
    gap?: number;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  } & PaddingStyles
> = ({
  py = 4,
  gap,
  maxWidth = 'md',
  children,
  backgroundColor,
  centered = true,
  ...styles
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: selectBackground(theme, backgroundColor ?? 'white'),
        py,
        ...styles,
      }}
    >
      <Container maxWidth={maxWidth}>
        <Flex centered={centered} column gap={gap}>
          {children}
        </Flex>
      </Container>
    </Box>
  );
};

export const ResponsiveImage: FC<{
  src: string;
  alt: string;
  verticallyResponsive?: boolean;
}> = ({ src, alt, verticallyResponsive }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={
        verticallyResponsive
          ? {
              maxHeight: '100%',
              width: 'auto',
            }
          : {
              maxWidth: '100%',
              height: 'auto',
            }
      }
    />
  );
};
