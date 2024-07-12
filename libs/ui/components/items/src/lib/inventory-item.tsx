import { HideSource, QuestionMarkOutlined } from '@mui/icons-material';
import { alpha, Box, Typography } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { PulsingIcon } from '@worksheets/ui/components/loading';
import { PaletteColor } from '@worksheets/ui/theme';
import { shorthandNumber } from '@worksheets/util/numbers';
import { InventoryItemSchema } from '@worksheets/util/types';

export const InventoryItem: React.FC<{
  icon?: React.ReactNode;
  size?: number;
  item?: Pick<InventoryItemSchema, 'imageUrl' | 'name' | 'quantity'>;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: PaletteColor;
}> = ({
  loading,
  icon,
  size = 72,
  color = 'primary',
  item,
  disabled,
  onClick,
}) => {
  return (
    <Box
      onClick={() => {
        if (disabled) return;
        if (loading) return;
        onClick?.();
      }}
      sx={{
        position: 'relative',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) =>
          `3px solid ${
            disabled
              ? theme.palette.grey[600]
              : alpha(theme.palette[color].main, 0.5)
          }`,
        p: 0.25,
        width: 'fit-content',
        backgroundColor: (theme) =>
          disabled
            ? theme.palette.grey[300]
            : alpha(theme.palette[color].main, 0.1),
        cursor: loading
          ? 'progress'
          : disabled
          ? 'not-allowed'
          : onClick
          ? 'pointer'
          : 'default',
      }}
    >
      <Box
        sx={{
          height: size,
          width: size,
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {loading ? (
          <PulsingIcon size={size} />
        ) : disabled ? (
          <HideSource
            color="action"
            sx={{ width: size * 0.8, height: size * 0.8 }}
          />
        ) : item ? (
          <FillImage src={item.imageUrl} alt={item.name} />
        ) : (
          <QuestionMarkOutlined
            color={'primary'}
            sx={{ width: size * 0.8, height: size * 0.8 }}
          />
        )}
      </Box>

      {!loading && item && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
          }}
        >
          <Typography
            lineHeight={1}
            fontWeight={900}
            sx={{
              WebkitTextStroke: '1px',
              WebkitTextStrokeColor: '#DDDDDD',
            }}
          >
            {shorthandNumber(item.quantity)}
          </Typography>
        </Box>
      )}
      {!loading && icon && (
        <Box sx={{ position: 'absolute', top: -10, left: -10 }}>{icon}</Box>
      )}
    </Box>
  );
};
