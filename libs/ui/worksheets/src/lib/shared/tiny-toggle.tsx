import { Circle, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Button,
  ButtonProps,
  PaletteColor,
  Theme,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';

type TinyButtonColor = ButtonProps['color'];

export const TinyToggle: React.FC<
  Pick<
    ButtonProps,
    'onClick' | 'startIcon' | 'children' | 'color' | 'disabled'
  > & {
    checked?: boolean;
    tooltip?: string;
  }
> = ({ children, color, checked = false, onClick, tooltip, disabled }) => {
  const theme = useTheme();

  const borderColor = createBorderColor(
    selectPaletteColor(theme, color),
    checked
  );
  const textColor = createTextColor(selectPaletteColor(theme, color), checked);

  const backgroundColor = createBackgroundColor(
    theme.palette.action.hoverOpacity * 2,
    selectPaletteColor(theme, color),
    checked
  );

  const hoverColor = createTextColor(selectPaletteColor(theme, color), true);

  const hoverBorderColor = createBorderColor(
    selectPaletteColor(theme, color),
    true
  );

  const hoverBackgroundColor = createBackgroundColor(
    theme.palette.action.hoverOpacity * 4,
    selectPaletteColor(theme, color),
    checked
  );

  return (
    <Tooltip title={tooltip} disableHoverListener={!tooltip} placement="top">
      <span>
        <Button
          disabled={disabled}
          variant="outlined"
          size="small"
          onClick={onClick}
          color={color}
          startIcon={
            checked ? (
              <Circle sx={{ height: 12, width: 12, mr: -0.5 }} />
            ) : (
              <RadioButtonUnchecked sx={{ height: 12, width: 12, mr: -0.5 }} />
            )
          }
          sx={{
            px: 1,
            py: 0,
            mx: 0,
            my: 0,
            fontSize: 12,
            textTransform: 'none',
            fontWeight: 900,
            borderColor,
            color: textColor,
            backgroundColor,
            '&:hover': {
              borderColor: hoverBorderColor,
              color: hoverColor,
              backgroundColor: hoverBackgroundColor,
            },
          }}
        >
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

function selectPaletteColor(theme: Theme, color: TinyButtonColor) {
  switch (color) {
    case 'primary':
      return theme.palette.primary;
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
}

function createBorderColor(color: PaletteColor, active: boolean) {
  return active ? color.main : alpha(color.main, 0.5);
}

function createTextColor(color: PaletteColor, active: boolean) {
  return active ? color.main : alpha(color.main, 0.5);
}

function createBackgroundColor(
  opacity: number,
  color: PaletteColor,
  active: boolean
) {
  return active ? alpha(color.main, opacity) : undefined;
}
