import { Box, Button, ButtonProps, Divider, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

export type Action = Pick<
  ButtonProps,
  'variant' | 'disabled' | 'onClick' | 'color' | 'sx'
> & {
  label: string;
  tooltip?: ReactNode;
};

export type Actions = {
  primary?: Action;
  secondary?: Action;
  tertiary?: Action;
};
export type FormLayoutProps = {
  children: ReactNode;
  actions?: Actions;
};

export const FormLayout = ({ children, actions }: FormLayoutProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      height: '100%',
    }}
  >
    <Box sx={{ flex: '1 0 auto' }}>{children}</Box>
    <Box>
      <Divider />
      <Box p={2} display="flex" alignItems="center" gap={2}>
        {actions?.primary && (
          <Tooltip
            title={actions.primary.tooltip}
            disableHoverListener={!actions.primary.tooltip}
            placement="top"
          >
            <span>
              <Button variant="contained" size="small" {...actions.primary}>
                {actions.primary.label}
              </Button>
            </span>
          </Tooltip>
        )}
        {actions?.secondary && (
          <Tooltip
            title={actions.secondary.tooltip}
            disableHoverListener={!actions.secondary.tooltip}
            placement="top"
          >
            <span>
              <Button variant="contained" size="small" {...actions.secondary}>
                {actions.secondary.label}
              </Button>
            </span>
          </Tooltip>
        )}
        {actions?.tertiary && (
          <Tooltip
            title={actions.tertiary.tooltip}
            disableHoverListener={!actions.tertiary.tooltip}
            placement="top"
          >
            <span>
              <Button variant="contained" size="small" {...actions.tertiary}>
                {actions.tertiary.label}
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  </Box>
);
