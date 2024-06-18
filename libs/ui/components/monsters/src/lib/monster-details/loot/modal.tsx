import { InfoOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Trophy } from '@worksheets/icons/adventure';
import { routes } from '@worksheets/routes';
import {
  ItemModalLayout,
  MobLootDescription,
} from '@worksheets/ui/components/items';
import { ModalWrapper } from '@worksheets/ui/components/modals';
import { MobLootSchema } from '@worksheets/util/types';

export const ItemModal: React.FC<ModalWrapper<{ loot: MobLootSchema }>> = ({
  open,
  onClose,
  loot,
}) => {
  return (
    <ItemModalLayout
      icon={loot.mvp && <Trophy sx={{ m: 0.5 }} />}
      item={{
        name: loot.item.name,
        imageUrl: loot.item.imageUrl,
      }}
      open={open}
      onClose={onClose}
      content={<MobLootDescription loot={loot} />}
      action={
        <Button
          fullWidth
          variant="arcade"
          size="small"
          startIcon={<InfoOutlined />}
          href={routes.item.path({ params: { itemId: loot.item.id } })}
        >
          Details
        </Button>
      }
    />
  );
};
