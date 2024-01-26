import { ArrowDropDown } from '@mui/icons-material';
import { Box, ButtonBase, Collapse, Paper, Typography } from '@mui/material';
import { PoweredByLogo } from '@worksheets/ui/components/logos';
import { Markdown } from '@worksheets/ui-core';
import React, { useState } from 'react';

export const PrizeDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  const [open, setOpen] = useState(false);

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
      <ButtonBase
        disableRipple
        disabled={open}
        onClick={() => setOpen(true)}
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'space-between' },
          gap: { xs: 2, sm: 1 },
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          color="text.arcade"
          sx={{
            typography: { xs: 'h6', sm: 'h5', md: 'h4' },
          }}
        >
          About This Prize
        </Typography>
        <ReadMore visible={!open} />
      </ButtonBase>
      <Collapse in={open}>
        <Box
          sx={{
            position: 'relative',
            px: 3,
            pb: 3,
            pt: 1,
          }}
        >
          <Typography
            component="div"
            variant="body1"
            color="white.main"
            fontFamily={(theme) => theme.typography.mPlus1p.fontFamily}
            whiteSpace={'pre-wrap'}
          >
            <Markdown text={description} />
          </Typography>
          <Box pb={1} pt={{ xs: 5, sm: 10 }}>
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

const ReadMore: React.FC<{ visible: boolean }> = ({ visible }) => (
  <Box display={visible ? 'flex' : 'none'} alignItems="center" gap={0.25}>
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
