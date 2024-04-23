import { Edit, Replay } from '@mui/icons-material';
import { Button, Collapse, Typography } from '@mui/material';
import { QuestCategory, QuestFrequency, QuestStatus } from '@prisma/client';
import { Column, Row } from '@worksheets/ui/components/flex';
import { QuestFilterOptions } from '@worksheets/util/types';
import { useState } from 'react';

import {
  formatQuestCategoryLabel,
  formatQuestFrequencyLabel,
  formatQuestStatusLabel,
  selectQuestColor,
} from '../util';

const sumFilters = (filters: QuestFilterOptions) =>
  filters.categories.length +
  filters.frequencies.length +
  filters.statuses.length;

export const QuestFilters: React.FC<{
  filters: QuestFilterOptions;
  onReset: () => void;
  onChange: (filters: QuestFilterOptions) => void;
}> = ({ onChange, filters, onReset }) => {
  const [edit, setEdit] = useState(false);
  return (
    <Column>
      <Row justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Filters ({sumFilters(filters)})</Typography>
        <Button
          variant="arcade"
          size="small"
          onClick={() => setEdit((e) => !e)}
          startIcon={<Edit />}
        >
          Edit
        </Button>
      </Row>
      <Collapse in={edit}>
        <Column gap={2} pt={3}>
          <Column>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              <u>Category</u>
            </Typography>
            <Row gap={1.5} flexWrap="wrap">
              {Object.keys(QuestCategory).map((category) => (
                <Button
                  key={category}
                  variant="arcade"
                  color={
                    filters.categories.includes(category as QuestCategory)
                      ? 'primary'
                      : 'dark-grey'
                  }
                  size="small"
                  sx={{ minWidth: 100 }}
                  onClick={() => {
                    if (
                      filters.categories.includes(category as QuestCategory)
                    ) {
                      onChange({
                        ...filters,
                        categories: filters.categories.filter(
                          (f) => f !== category
                        ),
                      });
                    } else {
                      onChange({
                        ...filters,
                        categories: [
                          ...filters.categories,
                          category as QuestCategory,
                        ],
                      });
                    }
                  }}
                >
                  {formatQuestCategoryLabel(category as QuestCategory)}
                </Button>
              ))}
            </Row>
          </Column>
          <Column>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              <u>Status</u>
            </Typography>
            <Row gap={1.5} flexWrap="wrap">
              {Object.keys(QuestStatus).map((status) => (
                <Button
                  key={status}
                  variant="arcade"
                  color={
                    filters.statuses.includes(status as QuestStatus)
                      ? selectQuestColor(status as QuestStatus)
                      : 'dark-grey'
                  }
                  size="small"
                  sx={{ minWidth: 100 }}
                  onClick={() => {
                    if (filters.statuses.includes(status as QuestStatus)) {
                      onChange({
                        ...filters,
                        statuses: filters.statuses.filter((f) => f !== status),
                      });
                    } else {
                      onChange({
                        ...filters,
                        statuses: [...filters.statuses, status as QuestStatus],
                      });
                    }
                  }}
                >
                  {formatQuestStatusLabel(status as QuestStatus)}
                </Button>
              ))}
            </Row>
          </Column>
          <Column>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              <u>Frequency</u>
            </Typography>
            <Row gap={1.5} flexWrap="wrap">
              {Object.keys(QuestFrequency).map((frequency) => (
                <Button
                  key={frequency}
                  variant="arcade"
                  color={
                    filters.frequencies.includes(frequency as QuestFrequency)
                      ? 'primary'
                      : 'dark-grey'
                  }
                  size="small"
                  sx={{ minWidth: 100 }}
                  onClick={() => {
                    if (
                      filters.frequencies.includes(frequency as QuestFrequency)
                    ) {
                      onChange({
                        ...filters,
                        frequencies: filters.frequencies.filter(
                          (f) => f !== frequency
                        ),
                      });
                    } else {
                      onChange({
                        ...filters,
                        frequencies: [
                          ...filters.frequencies,
                          frequency as QuestFrequency,
                        ],
                      });
                    }
                  }}
                >
                  {formatQuestFrequencyLabel(frequency as QuestFrequency)}
                </Button>
              ))}
            </Row>
          </Column>
          <Button
            variant="arcade"
            color={'secondary'}
            onClick={onReset}
            startIcon={<Replay />}
            sx={{
              width: { xs: '100%', sm: 'fit-content' },
              mt: 2,
            }}
          >
            Reset Filters
          </Button>
        </Column>
      </Collapse>
    </Column>
  );
};
