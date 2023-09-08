import { Circle, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Button,
  ButtonProps,
  PaletteColor,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';
import { selectPaletteColor } from './palettes';

export const TinyToggle: React.FC<
  Pick<
    ButtonProps,
    'onClick' | 'startIcon' | 'children' | 'color' | 'disabled'
  > & {
    checked?: boolean;
    tooltip?: string;
    fullWidth?: boolean;
  }
> = ({
  children,
  color,
  checked = false,
  onClick,
  tooltip,
  disabled,
  startIcon,
  fullWidth,
}) => {
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

  const setStartIcon = () => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (startIcon) return <>{startIcon}</>;

    return checked ? (
      <Circle sx={{ height: 12, width: 12 }} />
    ) : (
      <RadioButtonUnchecked sx={{ height: 12, width: 12 }} />
    );
  };

  return (
    <Tooltip title={tooltip} disableHoverListener={!tooltip} placement="top">
      <span>
        <Button
          disabled={disabled}
          variant="outlined"
          size="small"
          fullWidth={fullWidth}
          onClick={onClick}
          color={color}
          startIcon={setStartIcon()}
          sx={{
            top: -2, // TODO: there's something causing a slight offset, not sure what.
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
            '& .MuiSvgIcon-root': {
              mr: -0.5,
            },
          }}
        >
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

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
