import { NextPageWithLayout } from '@worksheets/util-next';
import {
  ReceiptScreen,
  ReceiptScreenProps,
} from '@worksheets/ui/pages/receipts';
import { LayoutContainer } from '../containers/layout-container';
import { CharityOrganization, DonationReceipt } from '@worksheets/util/types';
import {
  charityValues,
  donations,
} from '@worksheets/data-access/charity-games';

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
