import { Check, SvgIconComponent } from '@mui/icons-material';
import { Box, SxProps, Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const ActionButton: FC<{
  circular?: boolean;
  active?: boolean;
  disabled?: boolean;
  size: number;
  onClick?: () => void;
  label?: string;
  LabelProps?: SxProps;
  Icon: SvgIconComponent;
  IconProps?: SxProps;
}> = ({
  circular,
  active,
  size,
  disabled,
  label,
  LabelProps,
  Icon,
  IconProps,
  onClick,
}) => {
  const theme = useTheme();

  const borderThickness = () => {
    return size < 26 ? '3px' : '4px';
  };

  return (
    <Flex column centered gap={0.25}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          onClick={disabled ? undefined : onClick}
          sx={{
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            p: '1px',
            borderRadius: circular ? '50%' : '4px',
            backgroundColor: disabled ? theme.palette.text.disabled : 'white',
            border: `${borderThickness()} solid ${
              active ? theme.palette.primary.main : 'black'
            }`,
          }}
        >
          <Icon sx={{ color: 'black', fontSize: size * 1.2, ...IconProps }} />
        </Box>

        {active && (
          <Check
            sx={{
              position: 'absolute',
              color: theme.palette.primary.main,
              borderRadius: '50%',
              border: `${borderThickness()} solid ${
                theme.palette.primary.main
              }`,
              fontSize: size * 0.6,
              backgroundColor: 'white',
              bottom: -size * 0.3,
              right: -size * 0.3,
            }}
          />
        )}
      </Box>
      {label && (
        <Typography
          fontSize={size * 0.5}
          fontWeight={900}
          sx={LabelProps}
          color={
            disabled ? theme.palette.text.disabled : theme.palette.text.primary
          }
        >
          {label}
        </Typography>
      )}
    </Flex>
  );
};
