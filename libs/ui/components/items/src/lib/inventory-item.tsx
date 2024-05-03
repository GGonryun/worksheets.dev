import { QuestionMarkOutlined } from '@mui/icons-material';
import { alpha, Box, Typography } from '@mui/material';
import { FillImage } from '@worksheets/ui/components/images';
import { shorthandNumber } from '@worksheets/util/numbers';
import { InventoryItemSchema } from '@worksheets/util/types';

export const InventoryItem: React.FC<{
  icon?: React.ReactNode;
  size?: number;
  item?: Pick<InventoryItemSchema, 'imageUrl' | 'name' | 'quantity'>;
  onClick?: () => void;
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
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {item ? (
          <FillImage src={item.imageUrl} alt={item.name} />
        ) : (
          <QuestionMarkOutlined
            color={'primary'}
            sx={{ width: size * 0.8, height: size * 0.8 }}
          />
        )}
      </Box>

      {item && (
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
      {icon && (
        <Box sx={{ position: 'absolute', top: -10, left: -10 }}>{icon}</Box>
      )}
    </Box>
  );
};
