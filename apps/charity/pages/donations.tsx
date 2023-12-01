import { NextPageWithLayout } from '@worksheets/util-next';
import {
  CharityOrganization,
  DonationReceipt,
  ReceiptScreen,
  ReceiptScreenProps,
  charityValues,
  donations,
} from '@worksheets/ui-charity';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => {
  return <ReceiptScreen rows={donations.map(createRow(charityValues))} />;
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;

const createRow =
  (charities: CharityOrganization[]) =>
  (receipt: DonationReceipt): ReceiptScreenProps['rows'][number] => {
    const charity = charities.find(
      (charity) => charity.id === receipt.organizationId
    );
    if (!charity) {
      throw new Error(`Charity with id ${receipt.organizationId} not found`);
    }
    return {
      date: receipt.date,
      organization: { name: charity.name, url: charity.url },
      receipt: receipt.receipt,
      quantity: receipt.quantity,
    };
  };
