import { ApplicationMetadata } from '../framework';

export const jsonbin: ApplicationMetadata<'jsonbin'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/jsonbin.svg',
  title: 'JSONBIN.io',
  subtitle: 'Store and retrieve JSON data in the cloud',
  categories: ['Data', 'Storage'],
  description:
    'Storing a simple JSON record on the Cloud would be cumbersome. There has been several services which tried to create a Simple process around Storing and Retrieving JSON records but JSONBin.io has come up with the simple CRUD API using which, you can store the JSON records with ease, Modify & Delete your data in no time.\n\nBins API is something you will need the most, as it allows you to take complete control on your JSON Data.',
  creator: 'Worksheets.dev',
  lastUpdated: 1692076251067,
  tutorialUrl: 'https://jsonbin.io/api-reference',
  methods: {
    createBin: {
      title: 'Create Bin',
      description:
        'Create a Public or a Private JSON Bin. These bins can be either added to a Collection and can also be validated against a Schema Doc.',
      pricing: 0.001,
      sourceUrl: 'https://jsonbin.io/api-reference/bins/create',
    },
    updateBin: {
      title: 'Update Bin',
      description:
        'Update the Public & Private bins. You can also enable the Version Control if you would like to preserve the older data.',
      pricing: 0.001,
      sourceUrl: 'https://jsonbin.io/api-reference/bins/update',
    },
    deleteBin: {
      title: 'Delete Bin',
      description:
        'Delete Uncategorized or the Bins from a Collection. Deleting a Bin will also delete all its associated Versions.',
      pricing: 0.001,
      sourceUrl: 'https://jsonbin.io/api-reference/bins/delete',
    },
    listBins: {
      title: 'List Bins',
      description:
        'Using the Fetch Bins API, you could retrieve the records in your Collection by sorting them in an Ascending or Descending order. This API will only return you the Meta Data of the bins like Bin Id, Created At Timestamp, Private/Public bin etc.',
      pricing: 0.001,
      sourceUrl: 'https://jsonbin.io/api-reference/collections/bins',
    },
    readBin: {
      title: 'Read Bin',
      description: 'Read a Public or a Private Bin and its Versions.',
      pricing: 0.001,
      sourceUrl: 'https://jsonbin.io/api-reference/bins/read',
    },
  },
};
