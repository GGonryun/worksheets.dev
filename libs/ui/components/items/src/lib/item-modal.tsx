import { Close, QuestionMarkOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { ItemType } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage } from '@worksheets/ui/components/images';
import {
  Modal,
  ModalProps,
  ModalWrapper,
  OnClose,
} from '@worksheets/ui/components/modals';
import { PaletteColor } from '@worksheets/ui/theme';
import { toPercentage } from '@worksheets/util/numbers';
import { TABLET_SHADOW } from '@worksheets/util/styles';
import { printDateTime } from '@worksheets/util/time';
import { InventoryItemSchema, LootSchema } from '@worksheets/util/types';
import React from 'react';

const ITEM_TYPE_LABEL: Record<ItemType, string> = {
  STEAM_KEY: 'Steam Key',
  COMBAT: 'Combat',
  CONSUMABLE: 'Consumable',
  CURRENCY: 'Currency',
  SHARABLE: 'Sharable',
  ETCETERA: 'Etcetera',
};

const CloseButton: React.FC<{ onClick: OnClose }> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 6,
        right: 6,
      }}
    >
      <IconButton
        onClick={() => props.onClick?.({}, 'escapeKeyDown')}
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <Close fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};

const InfoButton: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 6,
        right: 6,
      }}
    >
      <IconButton
        href={routes.help.inventory.path()}
        target="_blank"
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <QuestionMarkOutlined fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};

const ModalLayout: React.FC<ModalProps> = ({ children, open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{
      width: '95%',
      maxWidth: 400,
    }}
  >
    <>
      <Box mb={2}>{children}</Box>
      <InfoButton />
      <CloseButton onClick={onClose} />
    </>
  </Modal>
);

export const ItemModalLayout: React.FC<
  ModalWrapper<{
    content?: React.ReactNode;
    item: Pick<InventoryItemSchema, 'imageUrl' | 'name'>;
    icon?: React.ReactNode;
    action?: React.ReactNode;
  }>
> = ({ content, icon, open, onClose, item, action }) => {
  return (
    <ModalLayout open={open} onClose={onClose}>
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
        <Column mt={1.5} mb={1} gap={1}>
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
    </ModalLayout>
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
      <ItemDataRow label="MVP" value={loot.mvp ? 'Yes' : 'No'} />
    </Column>
  </Column>
);
