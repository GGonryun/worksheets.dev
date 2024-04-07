import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, Link, Typography, useTheme } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Column, Row } from '@worksheets/ui/components/flex';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import {
  isPast,
  printDateTime,
  printTimeRemaining,
} from '@worksheets/util/time';
import { Quest } from '@worksheets/util/types';
import pluralize from 'pluralize';

import {
  formatQuestFrequencyLabel,
  selectQuestColor,
  selectQuestStatusIcon,
} from '../util';

export const QuestModal: React.FC<
  ModalWrapper<{ quest: Quest; children: React.ReactNode }>
> = ({ quest, children, ...modalProps }) => {
  const { reward, title, description, expiresAt } = quest;
  const theme = useTheme();
  const Icon = selectQuestStatusIcon(quest);
  const colorKey = selectQuestColor(quest);
  const color = theme.palette[colorKey].main;
  const frequency = formatQuestFrequencyLabel(quest.frequency);

  return (
    <BasicModal {...modalProps}>
      <Column gap={2}>
        <Column>
          <Row justifyContent="space-between">
            <Box mb={1}>
              <Button variant="square" color={colorKey} size="small">
                <Icon />
              </Button>
            </Box>
            <Column alignItems="flex-end">
              <Typography variant="body3" color={color} fontWeight={700}>
                {frequency} Quest
              </Typography>
              <Typography variant="body3" color={color} fontWeight={700}>
                Earn {reward} {pluralize('Token', reward)}
              </Typography>
            </Column>
          </Row>
          <Row justifyContent="space-between">
            <Typography variant="h6">{title}</Typography>
          </Row>
          <Typography variant="body2">{description}</Typography>
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
        {children}
        <Link href={routes.help.quests.path()}>
          <Row gap={0.5}>
            <InfoOutlined
              sx={{ fontSize: (theme) => theme.typography.body1.fontSize }}
            />
            <Typography variant="body3">How do quests work?</Typography>
          </Row>
        </Link>
      </Column>
    </BasicModal>
  );
};
