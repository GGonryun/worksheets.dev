import { Typography } from '@mui/material';
import { TextButton } from '../../TextButton';
import { useRouter } from 'next/router';
import { urls } from '../../../urls';

export const MoreGames = () => {
  const { push } = useRouter();
  return (
    <TextButton onClick={() => push(urls.games())}>
      <Typography variant="body1">More Games</Typography>
    </TextButton>
  );
};
