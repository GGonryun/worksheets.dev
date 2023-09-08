import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { ButtonProps, Tooltip, TooltipProps } from '@mui/material';
import { TinyButton } from '@worksheets/ui-basic-style';
import { useLayout } from '@worksheets/ui/common';
import { FC } from 'react';

type CustomTooltipProps = {
  TooltipProps?: Pick<
    TooltipProps,
    'title' | 'placement' | 'disableHoverListener'
  >;
};

export const SecondaryButton: FC<
  Pick<ButtonProps, 'children' | 'onClick'> & CustomTooltipProps
> = ({ children, ...props }) => {
  return (
    <ButtonLayout color="inherit" startIcon={<ArrowLeft />} {...props}>
      {children}
    </ButtonLayout>
  );
};

export const PrimaryButton: FC<
  Pick<ButtonProps, 'onClick' | 'children' | 'disabled'> & CustomTooltipProps
> = ({ children, ...props }) => {
  return (
    <ButtonLayout
      variant="contained"
      endIcon={props.disabled ? undefined : <ArrowRight />}
      {...props}
    >
      {children}
    </ButtonLayout>
  );
};

const ButtonLayout: FC<
  Pick<
    ButtonProps,
    | 'variant'
    | 'disabled'
    | 'onClick'
    | 'endIcon'
    | 'startIcon'
    | 'color'
    | 'children'
  > &
    CustomTooltipProps
> = ({ children, TooltipProps, ...props }) => {
  const { isMobile } = useLayout();
  return (
    <Tooltip {...TooltipProps} title={TooltipProps?.title ?? ''}>
      <span>
        <TinyButton sx={{ py: 1.5, width: isMobile ? 150 : 220 }} {...props}>
          {children}
        </TinyButton>
      </span>
    </Tooltip>
  );
};
