import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';

export const Logo = () => (
  <Flex fullWidth centered pt={4} pb={6}>
    <Image src="/images/bonsai.svg" alt={'Bonsai'} height={100} width={100} />
  </Flex>
);
