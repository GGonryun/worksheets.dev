import { Flex } from '@worksheets/ui-core';
import { Typography } from '@mui/material';
import { TextButton } from '../TextButton';
import { urls } from '../../urls';
import { useRouter } from 'next/router';

export const Subscribe = () => {
  const { push } = useRouter();
  return (
    <Flex fullWidth centered pt={2}>
      <TextButton onClick={() => push(urls.subscribe())}>
        <Typography variant="body1"> Newsletter</Typography>
      </TextButton>
    </Flex>
  );
};
