import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Typography, TypographyProps } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';

export const Header: React.FC<
  TypographyProps & {
    open?: boolean;
    onClick: () => void;
    visible?: { xs?: boolean; sm?: boolean; md?: boolean };
  }
> = ({ open, visible, onClick, ...props }) => {
  const Icon = open ? ArrowDropUp : ArrowDropDown;
  return (
    <Row
      justifyContent="center"
      onClick={onClick}
      sx={{
        display: visible
          ? {
              xs: visible.xs ? 'flex' : 'none',
              sm: visible.sm ? 'flex' : 'none',
              md: visible.md ? 'flex' : 'none',
            }
          : 'flex',
        backgroundColor: (theme) => theme.palette.background['solid-blue'],
      }}
    >
      <Typography
        variant="body2"
        {...props}
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          color: (theme) => theme.palette.text.arcade,
          padding: (theme) => theme.spacing(0.25, 0.5),
        }}
      />
      <Icon
        sx={{
          color: (theme) => theme.palette.text.arcade,
        }}
      />
    </Row>
  );
};
