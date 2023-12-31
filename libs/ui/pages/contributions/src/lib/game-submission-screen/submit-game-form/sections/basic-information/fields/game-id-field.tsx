import { PrefixTextField } from '@worksheets/ui/inputs';
import { BASE_URL } from '@worksheets/util/env';
import { FC } from 'react';

export const gameIdFieldId = 'game-id';

export const GameIdField: FC<{ error: string | undefined }> = ({ error }) => {
  return (
    <PrefixTextField
      id={gameIdFieldId}
      error={Boolean(error)}
      size="small"
      required
      label="Game ID"
      placeholder="game-id"
      helperText={
        error ??
        'Used in to identify and share your game link. Only letters, numbers, and dashes are allowed. Max 50 characters.'
      }
      prefix={`${BASE_URL}/play/`}
    />
  );
};
