import {
  styled,
  Tooltip as MuiTooltip,
  tooltipClasses,
  TooltipProps as MuiTooltipProps,
} from '@mui/material';

export type TooltipProps = MuiTooltipProps;

export const Tooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.blue.dark,
    maxWidth: 300,
    border: `2px solid ${theme.palette.text.blue.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
}));
