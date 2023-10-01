import { Flex } from '@worksheets/ui-core';
import { TextButton } from '../TextButton';
import { urls } from '../../urls';
import { useRouter } from 'next/router';

export const Subscribe = () => {
  const { push } = useRouter();
  return (
    <Flex fullWidth centered pt={2}>
      <TextButton onClick={() => push(urls.subscribe())}>Newsletter</TextButton>
    </Flex>
  );
};
