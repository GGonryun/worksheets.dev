import {
  charityValues,
  donations,
} from '@worksheets/data-access/charity-games';
import { printDate } from '@worksheets/util/time';
import {
  CharityOrganization,
  DonationReceipt,
  ReceiptInfo,
} from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure.output(z.custom<ReceiptInfo[]>()).query(() => {
  return donations.map(createRow(charityValues));
});

const createRow =
  (charities: CharityOrganization[]) =>
  (receipt: DonationReceipt): ReceiptInfo => {
    const charity = charities.find(
      (charity) => charity.id === receipt.organizationId
    );
    if (!charity) {
      throw new Error(`Charity with id ${receipt.organizationId} not found`);
    }
    return {
      date: printDate(receipt.date),
      organization: { name: charity.name, url: charity.url },
      receipt: receipt.receipt,
      quantity: receipt.quantity,
    };
  };
