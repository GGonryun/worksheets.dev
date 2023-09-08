import { Button, ButtonProps, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'none',
  '&:hover': {
    //grow on hover.
    transform: 'scale(1.05)',
    textDecoration: 'underline',
  },

  '&.MuiButton-outlinedInherit': {
    borderColor: theme.palette.grey[400],

    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      borderColor: theme.palette.grey[500],
    },
  },
  '&.MuiButton-outlinedSecondary': {
    borderColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
    },
  },
  '&.MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
    },
  },
  '&.MuiButton-textInherit': {
    backgroundColor: 'transparent',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  '&.Mui-disabled': {
    border: '1px solid',
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.grey[100],
  },
}));

export type TinyButtonProps = {
  children: ReactNode;
  breakText?: boolean;
  target?: string;
} & Pick<
  ButtonProps,
  | 'variant'
  | 'sx'
  | 'size'
  | 'startIcon'
  | 'endIcon'
  | 'onClick'
  | 'color'
  | 'disabled'
  | 'href'
>;
export const TinyButton: FC<TinyButtonProps> = ({
  children,
  breakText,
  sx,
  ...props
}) => {
  return (
    <CustomButton
      disableElevation
      sx={{
        minWidth: 0,
        whiteSpace: breakText ? 'normal' : 'nowrap',
        ...sx,
      }}
      {...props}
    >
      {children}
    </CustomButton>
  );
};
