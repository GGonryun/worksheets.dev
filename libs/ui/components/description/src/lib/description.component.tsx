import { ArrowDropDown } from '@mui/icons-material';
import {
  Box,
  ButtonBase,
  Collapse,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { SponsorLogo } from '@worksheets/ui/components/logos';
import React, { ReactNode, useState } from 'react';

export const Description: React.FC<{
  title: ReactNode;
  icons?: ReactNode;
  ancillary?: ReactNode;
  description: ReactNode;
  bonus?: ReactNode;
  open?: boolean;
  hideLogo?: boolean;
  logo?: ReactNode;
  color?: 'primary' | 'secondary';
}> = ({
  title,
  icons,
  ancillary,
  description,
  bonus,
  logo,
  open: initialState = false,
  hideLogo = false,
  color = 'primary',
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(initialState);

  const styles = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: { xs: 'center', sm: 'space-between' },
    gap: { xs: 2, sm: 1 },
    p: { xs: 2, sm: 3 },
  };
  const titleColor =
    color === 'primary'
      ? theme.palette.text.arcade
      : theme.palette.text.blue.dark;
  const backgroundColor =
    color === 'primary'
      ? theme.palette.background['transparent-blue']
      : theme.palette.background.paper;
  const textColor =
    color === 'primary'
      ? theme.palette.text.white
      : theme.palette.text.blue.dark;

  const ancillaryColor =
    color === 'primary'
      ? theme.palette.primary.light
      : theme.palette.error.main;

  const BarContent = () => (
    <Typography
      // this allows nested 'p' components to be styled
      component="div"
      color={titleColor}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        gap: 2,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        typography: { xs: 'h5', sm: 'h5', md: 'h4' },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={{ xs: 2, sm: 3 }}
        flexWrap="wrap"
      >
        {title}
        {open ? icons : bonus}
      </Box>
      {open ? ancillary : <ReadMore color={ancillaryColor} />}
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
        backgroundColor: backgroundColor,
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
            px: { xs: 2, sm: 3 },
            pb: 3,
          }}
        >
          <Typography
            component="div"
            variant="body1"
            fontWeight={500}
            color={textColor}
            fontFamily={(theme) => theme.typography.mPlus1p.fontFamily}
          >
            {description}
          </Typography>

          <Box
            position={{ xs: 'initial', sm: 'absolute' }}
            right={16}
            bottom={16}
            pt={{ xs: 4, sm: 0 }}
            display={hideLogo ? 'none' : 'flex'}
            alignItems={{ xs: 'center', sm: 'unset' }}
            justifyContent={{ xs: 'center', sm: 'unset' }}
          >
            {logo ? logo : <SponsorLogo color={textColor} />}
          </Box>
          <Box pb={1} pt={{ xs: 4, sm: 8 }}>
            <ReadLess
              visible={open}
              onClick={() => setOpen(false)}
              color={ancillaryColor}
            />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

const ReadMore: React.FC<{ color: string }> = ({ color }) => (
  <Box display={'flex'} alignItems="center" gap={0.25}>
    <Typography
      color={color}
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
        color,
        height: '2rem',
        width: '2rem',
      }}
    />
  </Box>
);

const ReadLess: React.FC<{
  visible: boolean;
  onClick: () => void;
  color: string;
}> = ({ visible, onClick, color }) => (
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
        color={color}
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
          color,
          height: '2rem',
          width: '2rem',
          transform: 'rotate(180deg)',
        }}
      />
    </ButtonBase>
  </Box>
);
