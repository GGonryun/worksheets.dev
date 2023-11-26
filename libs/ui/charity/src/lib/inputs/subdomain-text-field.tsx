import { Box, InputBaseProps } from '@mui/material';
import { FC } from 'react';
import { DefaultInputBase } from './default-input-base';
import { DenseInputLabel } from './dense-input-label';
import { ROOT_DOMAIN } from '../../env';

export const SubdomainTextField: FC<InputBaseProps> = (props) => {
  return (
    <Box display="flex" alignItems={'center'}>
      <DefaultInputBase
        {...props}
        placeholder="subdomain"
        sx={{
          ...props.sx,
          '& .MuiInputBase-input': {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      />
      <Box
        sx={{
          padding: (theme) => theme.spacing(0.5, 1),
          border: (theme) => `1px solid ${theme.palette.grey[500]}`,
          borderRadius: (theme) => `${theme.shape.borderRadius}px`,
          borderLeft: 'none',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <DenseInputLabel
          htmlFor="team-subdomain"
          sx={{
            color: 'black',
          }}
        >
          .{ROOT_DOMAIN}
        </DenseInputLabel>
      </Box>
    </Box>
  );
};
