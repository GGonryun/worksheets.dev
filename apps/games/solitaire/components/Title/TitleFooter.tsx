import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { MenuButton, animate, tabletBoxShadow } from '@worksheets/ui-games';
import { urls } from '../../util/urls';
import { Notifications, SportsEsports } from '@mui/icons-material';

export type TitleFooterProps = {
  // nothing.
};

export const TitleFooter: FC<TitleFooterProps> = () => {
  const { push } = useRouter();
  return (
    <Flex fullWidth mx={'auto'} pb={2}>
      <Flex grow spaceBetween px={2}>
        <motion.div {...animate(-100, 0.3)}>
          <MenuButton
            boxShadow={tabletBoxShadow}
            startIcon={<SportsEsports sx={{ pb: '2px' }} />}
            onClick={() => push(urls.games())}
          >
            More Games
          </MenuButton>
        </motion.div>

        <motion.div {...animate(-100, 0.3)}>
          <MenuButton
            boxShadow={tabletBoxShadow}
            startIcon={<Notifications sx={{ pb: '2px' }} />}
            onClick={() => push(urls.subscribe())}
          >
            Subscribe
          </MenuButton>
        </motion.div>
      </Flex>
    </Flex>
  );
};
