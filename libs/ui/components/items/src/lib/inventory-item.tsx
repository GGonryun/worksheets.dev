import { alpha, Box, Typography } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { shorthandNumber } from '@worksheets/util/numbers';
import { InventoryItemSchema } from '@worksheets/util/types';

export const InventoryItem: React.FC<{
  icon?: React.ReactNode;
  size?: number;
  item: InventoryItemSchema;
  onClick: () => void;
}> = ({ icon, size = 72, item, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) =>
          `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
        p: 0.25,
        width: 'fit-content',
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          height: size,
          width: size,
          position: 'relative',
        }}
      >
        <FillImage src={item.imageUrl} alt={item.name} />
      </Box>

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
      {icon && (
        <Box sx={{ position: 'absolute', top: -10, left: -10 }}>{icon}</Box>
      )}
    </Box>
  );
};
