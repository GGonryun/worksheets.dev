import { Box, SxProps, Theme, Tooltip } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export const TinyLogo: React.FC<{
  label?: string;
  src: string;
  borderless?: boolean;
  notSoTiny?: boolean;
  area?: number;
  sx?: SxProps<Theme>;
}> = ({ label, src, borderless, sx, area = 20 }) => (
  <Tooltip placement="top" title={label} disableHoverListener={!label}>
    <Box
      sx={sx}
      border={borderless ? {} : ({ palette }) => `1px solid ${palette.divider}`}
      borderRadius={0.5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={0.2}
    >
      {!src ? (
        <Box height={area} width={area} />
      ) : (
        <Image
          height={area}
          width={area}
          src={src}
          alt={label ? `${label} logo` : 'generic art'}
        />
      )}
    </Box>
  </Tooltip>
);
