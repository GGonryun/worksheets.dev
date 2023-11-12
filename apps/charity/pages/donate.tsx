import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { Container } from '@mui/material';
import { HeaderText, ParagraphText, QuoteText } from '../components/Typography';
import { UnderConstruction } from '../components/UnderConstruction';
import {
  WaterOrgLink,
  CharityWaterLink,
  FreeRiceLink,
} from '@worksheets/ui-games';

const Page: NextPageWithLayout = () => (
  <Container
    sx={{
      py: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <HeaderText>Donate Water</HeaderText>
    <UnderConstruction>
      <>
        <ParagraphText>
          Thank you for considering a donation. We are currently working on a
          way to accept donations. In the mean time, please consider donating to
          one of the following charities: <WaterOrgLink />, <CharityWaterLink />
          , <FreeRiceLink />
        </ParagraphText>
        <QuoteText
          text="Billions of people around the world are continuing to suffer from poor access to water, sanitation and hygiene. Globally, 1 in 3 people do not have access to safe drinking water."
          author="World Health Organization"
        />
      </>
    </UnderConstruction>
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
