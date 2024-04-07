import { Edit, Replay } from '@mui/icons-material';
import { Button, Collapse, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import {
  QUEST_CATEGORIES,
  QUEST_FREQUENCIES,
  QUEST_STATUSES,
  QuestFilterOptions,
} from '@worksheets/util/types';
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
              {QUEST_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant="arcade"
                  color={
                    filters.categories.includes(category)
                      ? 'primary'
                      : 'dark-grey'
                  }
                  size="small"
                  sx={{ minWidth: 100 }}
                  onClick={() => {
                    if (filters.categories.includes(category)) {
                      onChange({
                        ...filters,
                        categories: filters.categories.filter(
                          (f) => f !== category
                        ),
                      });
                    } else {
                      onChange({
                        ...filters,
                        categories: [...filters.categories, category],
                      });
                    }
                  }}
                >
                  {formatQuestCategoryLabel(category)}
                </Button>
              ))}
            </Row>
          </Column>
          <Column>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              <u>Status</u>
            </Typography>
            <Row gap={1.5} flexWrap="wrap">
              {QUEST_STATUSES.map((status) => (
                <Button
                  key={status}
                  variant="arcade"
                  color={
                    filters.statuses.includes(status)
                      ? selectQuestColor({ status })
                      : 'dark-grey'
                  }
                  size="small"
                  sx={{ minWidth: 100 }}
                  onClick={() => {
                    if (filters.statuses.includes(status)) {
                      onChange({
                        ...filters,
                        statuses: filters.statuses.filter((f) => f !== status),
                      });
                    } else {
                      onChange({
                        ...filters,
                        statuses: [...filters.statuses, status],
                      });
                    }
                  }}
                >
                  {formatQuestStatusLabel(status)}
                </Button>
              ))}
            </Row>
          </Column>
          <Column>
            <Typography variant="body2" fontWeight={500} gutterBottom>
              <u>Frequency</u>
            </Typography>
            <Row gap={1.5} flexWrap="wrap">
              {QUEST_FREQUENCIES.map((frequency) => (
                <Button
                  key={frequency}
                  variant="arcade"
                  color={
                    filters.frequencies.includes(frequency)
                      ? 'primary'
                      : 'dark-grey'
                  }
                  size="small"
                  sx={{ minWidth: 100 }}
                  onClick={() => {
                    if (filters.frequencies.includes(frequency)) {
                      onChange({
                        ...filters,
                        frequencies: filters.frequencies.filter(
                          (f) => f !== frequency
                        ),
                      });
                    } else {
                      onChange({
                        ...filters,
                        frequencies: [...filters.frequencies, frequency],
                      });
                    }
                  }}
                >
                  {formatQuestFrequencyLabel(frequency)}
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
