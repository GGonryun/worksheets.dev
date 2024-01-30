import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { labelFor } from '@worksheets/util/misc';
import { GameSubmissionForm } from '@worksheets/util/types';

import { useGameSubmissionFormContext } from '../../../../form-context';

type GameCategory = GameSubmissionForm['category'];

export const gameCategories: Record<GameCategory, string> = {
  ACTION: 'Action',
  ADVENTURE: 'Adventure',
  ARCADE: 'Arcade',
  BOARD: 'Board',
  CARD: 'Card',
  EDUCATIONAL: 'Educational',
  FIGHTING: 'Fighting',
  IDLE: 'Idle',
  NOVEL: 'Novel',
  PLATFORMER: 'Platformer',
  PUZZLE: 'Puzzle',
  RACING: 'Racing',
  RPG: 'RPG',
  RHYTHM: 'Rhythm',
  SHOOTER: 'Shooter',
  SIMULATION: 'Simulation',
  SPORTS: 'Sports',
  STRATEGY: 'Strategy',
  SURVIVAL: 'Survival',
  OTHER: 'Other',
  TRIVIA: 'Trivia',
  WORD: 'Word',
};

export const CategorySelectField = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();

  const id = 'category';
  const label = 'Category';

  const value = values[id];
  const error = errors[id];

  return (
    <FormControl fullWidth>
      <InputLabel size="small" id={labelFor(id)} error={Boolean(error)}>
        {label}
      </InputLabel>
      <Select
        id={id}
        labelId={labelFor(id)}
        error={Boolean(error)}
        size="small"
        label={label}
        defaultValue={'automatic'}
        value={value ?? ''}
        onChange={(e) => setFieldValue(id, e.target.value as GameCategory)}
      >
        {Object.entries(gameCategories).map(([key, value], i) => (
          <MenuItem dense value={key} key={key}>
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={Boolean(error)}>
        {error || 'The primary category of your game, max 50 characters'}
      </FormHelperText>
    </FormControl>
  );
};
