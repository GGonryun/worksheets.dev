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
import { BookmarkAnchor } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';

export const CollapsibleSection: FC<{
  id: string;
  text: string;
  description: string;
  children: ReactNode;
  status: ReactNode;
  Icon: SvgIconComponent;
  active: string | undefined;
  onClick: (id: string) => void;
}> = ({ id, text, description, status, children, Icon, active, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const open = active === id;

  return (
    <Box
      sx={{
        border: (theme) => `4px solid ${theme.palette.divider}`,
        borderRadius: (theme) => theme.shape.borderRadius,
        overflow: 'hidden',
      }}
    >
      <BookmarkAnchor id={id} />
      <ButtonBase
        onClick={() => onClick(id)}
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
          <RewardPanelAction open={open ?? false} />
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
