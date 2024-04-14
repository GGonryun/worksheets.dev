import { Check } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { FilterableNotificationType } from '@worksheets/util/types';

export const NotificationsTypeFilter: React.FC<{
  active: FilterableNotificationType;
  onChange: (type: FilterableNotificationType) => void;
}> = ({ active, onChange }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={1} alignItems="center" mb={1}>
      <Typography
        typography={{ xs: 'body1', sm: 'h6' }}
        fontWeight={{ xs: 'bold', sm: 'bold' }}
        mr={0.5}
      >
        Filter:
      </Typography>
      {Object.keys(buttonLabels).map((type) => (
        <CustomButton
          key={type}
          active={active}
          type={type as FilterableNotificationType}
          onClick={onChange}
        />
      ))}
    </Box>
  );
};

const buttonLabels: Record<FilterableNotificationType, string> = {
  ALL: 'All',
  FRIEND: 'Friends',
  SYSTEM: 'System',
  RAFFLE: 'Raffles',
  INVENTORY: 'Inventory',
  REWARD: 'Rewards',
  GAME: 'Games',
  QUEST: 'Quests',
};

const CustomButton: React.FC<{
  active: FilterableNotificationType;
  type: FilterableNotificationType;
  onClick: (type: FilterableNotificationType) => void;
}> = ({ active, type, onClick }) => (
  <Button
    variant="arcade"
    color={active === type ? 'secondary' : 'primary'}
    size="small"
    startIcon={active === type ? <Check /> : undefined}
    sx={{ width: 'fit-content', py: 0.5, px: 1 }}
    onClick={() => onClick(type)}
  >
    {buttonLabels[type]}
  </Button>
);
