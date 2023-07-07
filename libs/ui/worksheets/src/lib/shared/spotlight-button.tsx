import { OpenInNewOutlined } from '@mui/icons-material';
import { Paper, ButtonBase, Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const SpotlightButton: React.FC<{
  label: string;
  caption: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  elevation?: number;
  openInNewTab?: boolean;
}> = ({ label, caption, icon, href, onClick, elevation, openInNewTab }) => (
  <Paper
    elevation={elevation ?? 4}
    sx={(theme) => ({
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    })}
  >
    <ButtonBase
      href={href ?? ''}
      target={openInNewTab ? '_blank' : undefined}
      onClick={onClick}
      sx={{ width: '100%' }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        px={2}
      >
        <Box
          py={2}
          alignItems="center"
          display="flex"
          justifyContent="flex-start"
          gap={2}
        >
          <Box>
            <Box
              border={(theme) => `1px solid ${theme.palette.divider}`}
              borderRadius={1}
              p={0.25}
            >
              {icon}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Box>
              <Typography variant="body2" fontWeight={900}>
                {label}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">{caption}</Typography>
            </Box>
          </Box>
        </Box>
        {openInNewTab && <OpenInNewOutlined fontSize="small" color="primary" />}
      </Box>
    </ButtonBase>
  </Paper>
);
