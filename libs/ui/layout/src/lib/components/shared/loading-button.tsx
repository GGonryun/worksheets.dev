import { HourglassTop } from '@mui/icons-material';

import { SquareButton } from './square-button';

export const LoadingButton = () => {
  return (
    <SquareButton color="primary">
      <HourglassTop fontSize="small" />
    </SquareButton>
  );
};
