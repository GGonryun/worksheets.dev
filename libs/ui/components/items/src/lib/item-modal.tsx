import { Box, Divider, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage } from '@worksheets/ui/components/images';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { PaletteColor } from '@worksheets/ui/theme';
import { toPercentage } from '@worksheets/util/numbers';
import { TABLET_SHADOW } from '@worksheets/util/styles';
import { printDateTime } from '@worksheets/util/time';
import {
  InventoryItemSchema,
  ItemSchema,
  LootSchema,
} from '@worksheets/util/types';
import pluralize from 'pluralize';
import React from 'react';

import { itemTypeLabel } from './data';

export const ItemModalLayout: React.FC<
  ModalWrapper<{
    content?: React.ReactNode;
    item: Pick<ItemSchema, 'imageUrl' | 'name'>;
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
        <Column gap={2} alignItems="center">
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
                width: { xs: 128, mobile1: 80, mobile2: 96, sm: 128 },
                height: { xs: 128, mobile1: 80, mobile2: 96, sm: 128 },
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

const ItemDataRow: React.FC<{
  label: string;
  value: string | number;
  color?: PaletteColor;
  href?: string;
}> = (props) => (
  <Row gap={0.5} alignItems={'flex-start'}>
    <ItemDataLabel>{props.label}</ItemDataLabel>
    <ItemDataValue>{props.value}</ItemDataValue>
  </Row>
);

const ItemDataLabel: React.FC<{ children: string[] | string }> = (props) => (
  <Typography
    typography={{ xs: 'body3', sm: 'body2' }}
    fontWeight={{ xs: 500, sm: 500 }}
  >
    {props.children}
  </Typography>
);

const ItemDataValue: React.FC<{
  children: (string | number)[] | string | number;
}> = (props) => (
  <Typography typography={{ xs: 'body3', sm: 'body2' }}>
    {props.children}
  </Typography>
);

export const InventoryItemDescription: React.FC<{
  item: InventoryItemSchema;
}> = ({ item }) => (
  <Column gap={1}>
    <Typography typography={{ xs: 'body2', sm: 'body1' }}>
      {item.description}
    </Typography>
    <Column>
      <ItemDataRow label="Type:" value={itemTypeLabel[item.type]} />
      <ItemDataRow label="Quantity:" value={item.quantity} />
      <ItemDataRow label="Value:" value={item.value} />
      {item.expiresAt && (
        <ItemDataRow
          color="error"
          label="Expires:"
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
      <ItemDataRow label="Type:" value={itemTypeLabel[loot.item.type]} />
      <ItemDataRow label="Quantity:" value={loot.quantity} />
      <ItemDataRow
        label="Drop Chance:"
        value={toPercentage(loot.chance, 1, 2)}
      />
      <ItemDataRow
        label="Sells For:"
        value={`${loot.item.sell} ${pluralize('token', loot.item.sell)}`}
      />
      <ItemDataRow label="Loot:" value={loot.mvp ? 'MVP' : 'Basic'} />
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
      <ItemDataRow label="Type:" value={itemTypeLabel[loot.item.type]} />
      <ItemDataRow label="Quantity:" value={`${loot.quantity} per quest`} />
      <ItemDataRow
        label="Drop Chance:"
        value={toPercentage(loot.chance, 1, 1)}
      />
      <ItemDataRow
        label="Sells For:"
        value={`${loot.item.sell} ${pluralize('token', loot.item.sell)}`}
      />
    </Column>
  </Column>
);
