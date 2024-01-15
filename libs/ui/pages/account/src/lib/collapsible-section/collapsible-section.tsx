import {
  ChevronRight,
  ExpandLess,
  ExpandMore,
  SvgIconComponent,
} from '@mui/icons-material';
import {
  Box,
  ButtonBase,
  Collapse,
  SvgIconOwnProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, ReactNode, useState } from 'react';

export const CollapsibleSection: FC<{
  text: string;
  description: string;
  children: ReactNode;
  status: ReactNode;
  Icon: SvgIconComponent;
  open?: boolean;
}> = ({
  text,
  description,
  status,
  children,
  Icon,
  open: defaultOpen = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(defaultOpen); // TODO: default to false after testing

  return (
    <Box
      sx={{
        border: (theme) => `4px solid ${theme.palette.divider}`,
        borderRadius: (theme) => theme.shape.borderRadius,
        overflow: 'hidden',
      }}
    >
      <ButtonBase
        onClick={() => setOpen((o) => !o)}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          p: 2,
          gap: 1,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 1, sm: 3 },
          }}
        >
          <Icon
            sx={{
              height: { xs: 48, sm: 64 },
              width: { xs: 48, sm: 64 },
            }}
          />
          <Box textAlign="start">
            <Typography variant={isMobile ? 'h6' : 'h5'}>{text}</Typography>
            <Typography variant={isMobile ? 'body3' : 'body2'}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {status}
          <RewardPanelAction open={open} />
        </Box>
      </ButtonBase>
      <Collapse in={open}>
        <Box
          sx={{
            p: 2,
            borderTop: (theme) => `4px solid ${theme.palette.divider}`,
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

const RewardPanelAction: FC<{ open: boolean }> = ({ open }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const actionSx: SvgIconOwnProps['sx'] = {
    fontSize: { xs: '2rem', sm: '3rem' },
  };

  if (isMobile) {
    if (open) return <ExpandLess sx={actionSx} />;
    return <ExpandMore sx={actionSx} />;
  } else {
    if (open) return <ExpandLess sx={actionSx} />;
    return <ChevronRight sx={actionSx} />;
  }
};
