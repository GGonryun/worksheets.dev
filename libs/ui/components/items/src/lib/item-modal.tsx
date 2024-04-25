import { Box, Divider, Typography } from '@mui/material';
import { ItemType } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage } from '@worksheets/ui/components/images';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { PaletteColor } from '@worksheets/ui/theme';
import { toPercentage } from '@worksheets/util/numbers';
import { TABLET_SHADOW } from '@worksheets/util/styles';
import { printDateTime } from '@worksheets/util/time';
import { InventoryItemSchema, LootSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';
import React from 'react';

const ITEM_TYPE_LABEL: Record<ItemType, string> = {
  STEAM_KEY: 'Steam Key',
  COMBAT: 'Combat',
  CONSUMABLE: 'Consumable',
  CURRENCY: 'Currency',
  SHARABLE: 'Sharable',
  ETCETERA: 'Miscellaneous',
};

export const ItemModalLayout: React.FC<
  ModalWrapper<{
    content?: React.ReactNode;
    item: Pick<InventoryItemSchema, 'imageUrl' | 'name'>;
    icon?: React.ReactNode;
    action?: React.ReactNode;
  }>
> = ({ content, icon, open, onClose, item, action }) => {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      infoHref={routes.help.inventory.path()}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', mobile1: 'auto 1fr' },
          gridTemplateRows: 'auto',
          p: 2,
          gap: 2,
          position: 'relative',
        }}
      >
        <Column gap={2} justifyContent="space-between" alignItems="center">
          <Box
            sx={{
              borderRadius: (theme) => theme.shape.borderRadius,
              boxShadow: TABLET_SHADOW,
              p: 1,
              position: 'relative',
              width: 'fit-content',
            }}
          >
            {icon && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 4,
                  left: 4,
                }}
              >
                {icon}
              </Box>
            )}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 80, mobile2: 96, sm: 128 },
                height: { xs: 80, mobile2: 96, sm: 128 },
              }}
            >
              <ContainImage src={item.imageUrl} alt={item.name} />
            </Box>
          </Box>
          {action}
        </Column>
        <Column mt={1.5} gap={1}>
          <Column>
            <Typography
              typography={{ xs: 'body1', sm: 'h6' }}
              fontWeight={{ xs: 700, sm: 700 }}
            >
              {item.name}
            </Typography>
            <Divider />
          </Column>
          {content}
        </Column>
      </Box>
    </InfoModal>
  );
};

export const ItemDataRow: React.FC<{
  label: string;
  value: string | number;
  color?: PaletteColor;
}> = (props) => (
  <Row gap={0.5} alignItems={'flex-start'}>
    <Typography
      typography={{ xs: 'body3', sm: 'body2' }}
      fontWeight={{ xs: 500, sm: 500 }}
    >
      {props.label}:
    </Typography>
    <Typography
      typography={{ xs: 'body3', sm: 'body2' }}
      color={props.color ?? 'text.secondary'}
    >
      {props.value}
    </Typography>
  </Row>
);

export const ItemDescription: React.FC<{
  item: InventoryItemSchema;
}> = ({ item }) => (
  <Column gap={1}>
    <Typography typography={{ xs: 'body2', sm: 'body1' }}>
      {item.description}
    </Typography>
    <Column>
      <ItemDataRow label="Type" value={ITEM_TYPE_LABEL[item.type]} />
      <ItemDataRow label="Quantity" value={item.quantity} />
      <ItemDataRow label="Value" value={item.value} />
      {item.expiresAt && (
        <ItemDataRow
          color="error"
          label="Expires"
          value={printDateTime(item.expiresAt)}
        />
      )}
    </Column>
  </Column>
);

export const LootDescription: React.FC<{
  loot: LootSchema;
}> = ({ loot }) => (
  <Column gap={1}>
    <Typography typography={{ xs: 'body2', sm: 'body1' }}>
      {loot.item.description}
    </Typography>
    <Column>
      <ItemDataRow label="Type" value={ITEM_TYPE_LABEL[loot.item.type]} />
      <ItemDataRow label="Quantity" value={loot.quantity} />
      <ItemDataRow label="Drop Chance" value={toPercentage(loot.chance)} />
      <ItemDataRow
        label="Sells For"
        value={`${loot.item.sell} ${pluralize('token', loot.item.sell)}`}
      />
      <ItemDataRow label="MVP" value={loot.mvp ? 'Yes' : 'No'} />
    </Column>
  </Column>
);

export const QuestLootDescription: React.FC<{
  loot: LootSchema;
}> = ({ loot }) => (
  <Column gap={1}>
    <Typography typography={{ xs: 'body2', sm: 'body1' }}>
      {loot.item.description}
    </Typography>
    <Column>
      <ItemDataRow label="Type" value={ITEM_TYPE_LABEL[loot.item.type]} />
      <ItemDataRow label="Quantity" value={`${loot.quantity} per quest`} />
      <ItemDataRow label="Drop Chance" value={toPercentage(loot.chance)} />
      <ItemDataRow
        label="Sells For"
        value={`${loot.item.sell} ${pluralize('token', loot.item.sell)}`}
      />
    </Column>
  </Column>
);
