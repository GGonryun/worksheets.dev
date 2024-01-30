import { ReceiptScreenProps } from '../components/receipt-screen';

export const sampleDonationReceipts: ReceiptScreenProps['rows'] = [
  {
    date: new Date('2021-10-01'),
    organization: { name: 'Water.org', url: 'https://water.org/' },
    receipt: 'https://www.charitywater.org/receipts/123',
    quantity: 1193.0,
  },
  {
    date: new Date('2021-10-02'),
    organization: { name: 'Water.org', url: 'https://water.org/' },
    receipt: 'https://www.charitywater.org/receipts/123',
    quantity: 1230.0,
  },
  {
    date: new Date('2021-10-03'),
    organization: { name: 'Water.org', url: 'https://water.org/' },
    receipt: 'https://www.charitywater.org/receipts/123',
    quantity: 2214.0,
  },
  {
    date: new Date('2021-10-04'),
    organization: { name: 'Water.org', url: 'https://water.org/' },
    receipt: 'https://www.charitywater.org/receipts/123',
    quantity: 12.0,
  },
  {
    date: new Date('2021-10-05'),
    organization: { name: 'Water.org', url: 'https://water.org/' },
    receipt: 'https://www.charitywater.org/receipts/123',
    quantity: 56.0,
  },
  {
    date: new Date('2021-10-06'),
    organization: { name: 'Water.org', url: 'https://water.org/' },
    receipt: 'https://www.charitywater.org/receipts/123',
    quantity: 413.0,
  },
];
