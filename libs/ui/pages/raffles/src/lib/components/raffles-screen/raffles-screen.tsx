import { Box } from '@mui/material';
import { isExpired } from '@worksheets/util/time';
import { EnteredRaffleSchema, RaffleSchema } from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { RaffleContents } from './raffle-contents';
import { TitleText } from './title-text';

export const RafflesScreen: React.FC<{
  entered: EnteredRaffleSchema[];
  list: RaffleSchema[];
}> = ({ entered, list }) => (
  <CustomContainer>
    <TitleText />
    <Box
      width="100%"
      display="flex"
      gap={{ xs: 4, sm: 4, md: 6 }}
      flexDirection="column"
      alignItems="center"
    >
      <RaffleContents
        entered={entered}
        list={list.filter((l) => isExpired(l.publishAt))}
      />
    </Box>
  </CustomContainer>
);

export type RafflesScreenProps = React.ComponentProps<typeof RafflesScreen>;
