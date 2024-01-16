import {
  charityValues,
  donations,
} from '@worksheets/data-access/charity-games';
import {
  ReceiptScreen,
  ReceiptScreenProps,
} from '@worksheets/ui/pages/receipts';
import { CharityOrganization, DonationReceipt } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../dynamic/dynamic-layout';
import { donationsSeo } from '../util/seo';

export type Props = {
  receipts: ReceiptScreenProps['rows'];
};

const Page: NextPageWithLayout<Props> = ({ receipts }) => {
  return (
    <>
      <NextSeo {...donationsSeo} />
      <ReceiptScreen rows={receipts} />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export const getServerSideProps = (async ({ params }) => {
  return { props: { receipts: donations.map(createRow(charityValues)) } };
}) satisfies GetServerSideProps<Props>;

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
