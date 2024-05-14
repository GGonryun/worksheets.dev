import {
  ExpandLess,
  ExpandMore,
  InfoOutlined,
  OfflinePin,
} from '@mui/icons-material';
import { Box, Button, Collapse, Typography, useTheme } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import {
  InventoryItem,
  ItemModalLayout,
  QuestLootDescription,
} from '@worksheets/ui/components/items';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import {
  isPast,
  printDateTime,
  printTimeRemaining,
} from '@worksheets/util/time';
import { DetailedQuestSchema } from '@worksheets/util/types';
import React from 'react';

import {
  formatQuestCategoryLabel,
  formatQuestFrequencyLabel,
  formatQuestTypeLabel,
  isQuestComplete,
  selectQuestColor,
  selectQuestStatusIcon,
} from '../util';

export const QuestModal: React.FC<
  ModalWrapper<{ quest: DetailedQuestSchema; children: React.ReactNode }>
> = ({ quest, children, ...modalProps }) => {
  const [open, setOpen] = React.useState(false);
  const { name, description, expiresAt } = quest;
  const theme = useTheme();
  const Icon = selectQuestStatusIcon(quest.status, quest.type);
  const colorKey = selectQuestColor(quest.status);
  const color = theme.palette[colorKey].main;
  const frequency = formatQuestFrequencyLabel(quest.frequency);
  const category = formatQuestCategoryLabel(quest.category);
  const type = formatQuestTypeLabel(quest.type);

  return (
    <InfoModal {...modalProps} infoHref={routes.help.quests.path()}>
      <Column width="100%" p={2}>
        <Column gap={2}>
          <Column>
            <Row justifyContent="space-between">
              <Box mb={1}>
                <Button variant="square" color={colorKey} size="small">
                  <Icon />
                </Button>
              </Box>
              <Column alignItems="flex-end" pr={3}>
                <Typography variant="body3" color={color} fontWeight={500}>
                  {category} - {type}
                </Typography>
                <Typography variant="body3" color={color} fontWeight={500}>
                  {frequency} Quest
                </Typography>
              </Column>
            </Row>
            <Column alignItems="flex-start" textAlign="left">
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2">{description}</Typography>
            </Column>
          </Column>
          {expiresAt > 0 && (
            <Typography variant="body2" color="text.secondary">
              {!isPast(expiresAt) ? (
                <>
                  This quest resets in <b>{printTimeRemaining(expiresAt)}</b> on{' '}
                  <b>{printDateTime(expiresAt)}</b>
                </>
              ) : undefined}
            </Typography>
          )}
          <Box width="100%">{children}</Box>
          <Button
            onClick={() => setOpen((o) => !o)}
            size="small"
            variant="arcade"
            color="secondary"
            endIcon={open ? <ExpandLess /> : <ExpandMore />}
            sx={{ width: 'fit-content' }}
          >
            View Rewards
          </Button>
        </Column>
        <Collapse in={open}>
          <Column mt={2}>
            <Row mx={1} gap={2} flexWrap="wrap">
              {quest.loot.map((l) => (
                <InventoryInformation
                  key={l.item.id}
                  loot={l}
                  status={quest.status}
                />
              ))}
            </Row>
          </Column>
        </Collapse>
      </Column>
    </InfoModal>
  );
};

const InventoryInformation: React.FC<{
  loot: DetailedQuestSchema['loot'][number];
  status: DetailedQuestSchema['status'];
}> = ({ loot, status }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <InventoryItem
        icon={
          isQuestComplete(status) && (
            <OfflinePin
              color="success"
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white.main',
              }}
            />
          )
        }
        size={64}
        item={{ ...loot, ...loot.item }}
        onClick={() => setOpen(true)}
      />
      <ItemModalLayout
        item={loot.item}
        open={open}
        onClose={() => setOpen(false)}
        content={<QuestLootDescription loot={loot} />}
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
    </>
  );
};
