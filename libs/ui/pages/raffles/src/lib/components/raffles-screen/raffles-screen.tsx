import { Box, Container } from '@mui/material';
import { HorizontalAdvertisement } from '@worksheets/ui/components/advertisements';
import { Description } from '@worksheets/ui/components/description';
import { helpPrizes } from '@worksheets/ui/components/help';
import { Questions } from '@worksheets/ui/components/qa-section';
import { isExpired } from '@worksheets/util/time';
import { EnteredRaffleSchema, RaffleSchema } from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { RaffleContents } from './raffle-contents';
import { TitleText } from './title-text';

export const RafflesScreen: React.FC<{
  entered: EnteredRaffleSchema[];
  list: RaffleSchema[];
}> = ({ entered, list }) => (
  <>
    <CustomContainer>
      <TitleText />
      <HorizontalAdvertisement unit="raffles" text bordered tall />
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
    <Container
      maxWidth="lg"
      sx={{
        mb: 4,
      }}
    >
      <Description
        title="Frequently Asked Questions"
        color="secondary"
        description={
          <Box mt={{ xs: 3, sm: 4 }}>
            <Questions qa={helpPrizes} />
          </Box>
        }
      />
    </Container>
  </>
);
