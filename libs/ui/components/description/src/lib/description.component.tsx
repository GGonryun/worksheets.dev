import { ArrowDropDown } from '@mui/icons-material';
import { Box, ButtonBase, Collapse, Paper, Typography } from '@mui/material';
import { PoweredByLogo } from '@worksheets/ui/components/logos';
import { HTMLinator } from '@worksheets/ui-core';
import React, { ReactNode, useState } from 'react';

export const Description: React.FC<{
  title: ReactNode;
  icons?: ReactNode;
  ancillary?: ReactNode;
  description: string;
}> = ({ title, icons, ancillary, description }) => {
  const [open, setOpen] = useState(false);

  const styles = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: { xs: 'center', sm: 'space-between' },
    gap: { xs: 2, sm: 1 },
    p: { xs: 2, sm: 3 },
  };

  const BarContent = () => (
    <Typography
      // this allows nested 'p' components to be styled
      component="div"
      color="text.arcade"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        gap: 2,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        typography: { xs: 'h6', sm: 'h5', md: 'h4' },
      }}
    >
      <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 3 }}>
        {title}
        {open && icons}
      </Box>
      {open ? ancillary : <ReadMore />}
    </Typography>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
        borderRadius: (theme) => theme.shape.borderRadius,
        backgroundColor: (theme) =>
          theme.palette.background['transparent-blue'],
      }}
    >
      {open ? (
        <Box sx={styles}>
          <BarContent />
        </Box>
      ) : (
        <ButtonBase disableRipple onClick={() => setOpen(true)} sx={styles}>
          <BarContent />
        </ButtonBase>
      )}
      <Collapse in={open}>
        <Box
          sx={{
            position: 'relative',
            px: 3,
            pb: 3,
          }}
        >
          <Typography
            component="div"
            variant="body1"
            color="white.main"
            fontFamily={(theme) => theme.typography.mPlus1p.fontFamily}
          >
            <HTMLinator text={description} />
          </Typography>
          <Box pb={1} pt={{ xs: 4, sm: 8 }}>
            <ReadLess visible={open} onClick={() => setOpen(false)} />
          </Box>
          <Box
            position="absolute"
            right={16}
            bottom={16}
            display={{ xs: 'none', sm: 'block' }}
          >
            <PoweredByLogo />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

const ReadMore: React.FC = () => (
  <Box display={'flex'} alignItems="center" gap={0.25}>
    <Typography
      color="text.blue.light"
      textTransform="none"
      sx={{
        typography: { xs: 'h6', sm: 'h5' },
        fontWeight: { xs: 700, sm: 500 },
      }}
    >
      Read More
    </Typography>
    <ArrowDropDown
      sx={{
        color: (theme) => theme.palette.text.blue.light,
        height: '2rem',
        width: '2rem',
      }}
    />
  </Box>
);

const ReadLess: React.FC<{ visible: boolean; onClick: () => void }> = ({
  visible,
  onClick,
}) => (
  <Box
    display="flex"
    width="100%"
    justifyContent="center"
    visibility={visible ? 'visible' : 'hidden'}
  >
    <ButtonBase
      onClick={onClick}
      disableRipple
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.25,
        cursor: 'pointer',
        width: 'fit-content',
      }}
    >
      <Typography
        color="primary.light"
        textTransform="none"
        sx={{
          typography: { xs: 'h6', sm: 'h5' },
          fontWeight: { xs: 700, sm: 500 },
        }}
      >
        Read Less
      </Typography>
      <ArrowDropDown
        sx={{
          color: (theme) => theme.palette.primary.light,
          height: '2rem',
          width: '2rem',
          transform: 'rotate(180deg)',
        }}
      />
    </ButtonBase>
  </Box>
);