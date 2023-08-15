import { ApplicationRegistrySampleData } from './lib/framework';

export * from './lib/framework';

export const sampleData: ApplicationRegistrySampleData = {
  time: {
    context: null,
    now: {
      input: undefined,
      output: 1234,
    },
  },
  sys: {
    context: null,
    log: {
      input: {
        message: 'test',
        structuredData: {
          a: 1,
          test: true,
        },
      },
      output: null,
    },
  },
  math: {
    context: null,
    abs: {
      input: -123,
      output: 123,
    },
    calc: {
      input: {
        op: '^',
        x: 2,
        y: 4,
      },
      output: 16,
    },
    identity: {
      input: 1,
      output: 1,
    },
    min: {
      input: [1, 2, 3],
      output: 1,
    },
    max: {
      input: [1, 2, 3],
      output: 3,
    },
    avg: {
      input: [1, 2, 3],
      output: 2,
    },
  },
  openai: {
    context: {
      apiKey: '',
    },
    createChatCompletion: {
      input: {
        model: 'gpt-3.5-turbo',
        prompt: 'Say this is a test',
        max_tokens: 7,
        temperature: 0,
      },
      output: {
        object: 'chat.completion',
        model: 'gpt-3.5-turbo',
        id: 'chatcmpl-123',
        created: 0,
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: '\n\nHello there, how may I assist you today?',
            },
            finish_reason: 'stop',
          },
        ],
      },
    },
    createImage: {
      input: {
        prompt: '',
        n: 0,
        size: '1024x1024',
      },
      output: [],
    },
    listModels: {
      input: '',
      output: [{ id: '', object: '', owned_by: '' }],
    },
  },
  http: {
    request: {
      input: {
        url: 'https://api.sampleapis.com/beers/ale',
        method: 'GET',
      },
      output: {
        code: 200,
        url: 'https://api.sampleapis.com/beers/ale',
        body: [
          {
            price: '$16.99',
            name: 'Founders All Day IPA',
            rating: {
              average: 4.411243509154233,
              reviews: 453,
            },
            image:
              'https://www.totalwine.com/media/sys_master/twmmedia/h00/h94/11891416367134.png',
            id: 1,
          },
          {
            price: '$13.99',
            name: 'Blue Moon Belgian White Belgian-Style Wheat Ale',
            rating: {
              average: 4.775260833383482,
              reviews: 305,
            },
            image:
              'https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png',
            id: 2,
          },
        ],
      },
    },
  },
  json: {
    parse: {
      input: '{"a": 1, "b": true, "c": "test"}',
      output: { a: 1, b: true, c: 'test' },
    },
    query: {
      input: {
        query: '$..name',
        data: [
          { name: 'London', population: 8615246 },
          { name: 'Berlin', population: 3517424 },
          { name: 'Madrid', population: 3165235 },
          { name: 'Rome', population: 2870528 },
        ],
      },
      output: ['London', 'Berlin', 'Madrid', 'Rome'],
    },
    stringify: {
      input: {
        title: 'Black',
        description:
          'Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir.',
        ingredients: ['Coffee'],
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG',
        id: 1,
      },
      output:
        '{\n"title":"Black",\n"description":"Blackcoffeeisassimpleasitgetswithgroundcoffeebeanssteepedinhotwater,servedwarm.Andifyouwanttosoundfancy,youcancallblackcoffeebyitspropername:cafenoir.",\n"ingredients":[\n"Coffee"\n],\n"image":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG",\n"id":1\n}',
    },
  },
  gmail: {
    context: {
      accessToken: 'YOUR_ACCESS_TOKEN',
    },
    sendEmail: {
      input: {
        to: 'miguel@worksheets.dev',
        body: 'Test email from Worksheets',
        subject: 'This is a test of the Worksheets Gmail Integration',
      },
      output: {
        id: '1741123412341',
        to: 'miguel@worksheets.dev',
        sentAt: 1689915858,
      },
    },
    getUserEmail: {
      input: null,
      output: 'miguel@worksheets.dev',
    },
  },
  notion: {
    context: {
      apiKey: 'YOUR_NOTION_BOT_TOKEN',
    },
    listUsers: {
      input: undefined,
      output: {
        results: [
          {
            object: 'user',
            id: 'd40e767c-d7af-4b18-a86d-55c61f1e39a4',
            type: 'person',
            person: {
              email: 'avo@example.org',
            },
            name: 'Avocado Lovelace',
            avatarUrl:
              'https://secure.notion-static.com/e6a352a8-8381-44d0-a1dc-9ed80e62b53d.jpg',
          },
          {
            object: 'user',
            id: '9a3b5ae0-c6e6-482d-b0e1-ed315ee6dc57',
            type: 'bot',
            name: 'Doug Engelbot',
            avatarUrl:
              'https://secure.notion-static.com/6720d746-3402-4171-8ebb-28d15144923c.jpg',
          },
        ],
        nextCursor: 'fe2cc560-036c-44cd-90e8-294d5a74cebc',
        hasMore: true,
      },
    },
    getUser: {
      input: {
        userId: '8355f463-b098-406a-8edc-d7fe0708fb7f',
      },
      output: {
        object: 'user',
        id: 'd40e767c-d7af-4b18-a86d-55c61f1e39a4',
        type: 'person',
        person: {
          email: 'avo@example.org',
        },
        name: 'Avocado Lovelace',
        avatarUrl:
          'https://secure.notion-static.com/e6a352a8-8381-44d0-a1dc-9ed80e62b53d.jpg',
      },
    },
    getBot: {
      input: null,
      output: {
        object: 'user',
        id: '16d84278-ab0e-484c-9bdd-b35da3bd8905',
        name: 'peter piper',
        avatarUrl: undefined,
        type: 'bot',
      },
    },
    getDatabase: {
      input: {
        databaseId: '0f6b7f9d-1b1a-4b1a-8f5b-9d2b8e1e1e1e',
      },
      output: {
        object: 'database',
        id: 'bc1211ca-e3f1-4939-ae34-5260b16f627c',
        properties: {
          Price: {
            id: 'evWq',
            name: 'Price',
            type: 'number',
            number: {
              format: 'dollar',
            },
          },
          Description: {
            id: 'V}lX',
            name: 'Description',
            type: 'rich_text',
            rich_text: {},
          },
          'Food group': {
            id: 'CM%3EH',
            name: 'Food group',
            type: 'select',
            select: {
              options: [
                {
                  id: '6d4523fa-88cb-4ffd-9364-1e39d0f4e566',
                  name: '🥦Vegetable',
                  color: 'green',
                },
                {
                  id: '268d7e75-de8f-4c4b-8b9d-de0f97021833',
                  name: '🍎Fruit',
                  color: 'red',
                },
                {
                  id: '1b234a00-dc97-489c-b987-829264cfdfef',
                  name: '💪Protein',
                  color: 'yellow',
                },
              ],
            },
          },
          Name: {
            id: 'title',
            name: 'Name',
            type: 'title',
            title: {},
          },
        },
      },
    },
    createPage: {
      input: {
        parent: { databaseId: 'dc2b93e1-0094-4fe1-b09e-185d930ed137' },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'Text To Add',
                },
              },
            ],
          },
        },
      },
      output: {
        object: 'page',
        id: '59833787-2cf9-4fdf-8782-e53db20768a5',
      },
    },
  },
  slack: {
    context: {
      botToken: 'YOUR_SLACK_BOT_TOKEN',
    },
    listConversations: {
      input: undefined,
      output: {
        ok: true,
        channels: [
          {
            id: 'C061EG9T2',
            name: 'random',
            isChannel: true,
            isGroup: false,
            isIm: false,
            created: 1449252889,
            creator: 'U061F7AUR',
            isArchived: false,
            isGeneral: false,
            unlinked: 0,
            nameNormalized: 'random',
            isShared: false,
            isExtShared: false,
            isOrgShared: false,
            pendingShared: [],
            isPendingExtShared: false,
            isPrivate: false,
            isMpim: false,
            topic: {
              value: 'Non-work banter and water cooler conversation',
              creator: '',
              lastSet: 0,
            },
            purpose: {
              value:
                "A place for non-work-related flimflam, faffing, hodge-podge or jibber-jabber you'd prefer to keep out of more focused work-related channels.",
              creator: '',
              lastSet: 0,
            },
            previousNames: [],
          },
        ],
        responseMetadata: {
          nextCursor: 'dGVhbTpDMDYxRkE1UEI=',
        },
      },
    },
    sendChatMessage: {
      input: {
        channel: 'C123ABC456',
        text: 'Hello world :tada:',
      },
      output: {
        ok: true,
        channel: 'C123ABC456',
        ts: '1503435956.000247',
        message: {
          text: "Here's a message for you",
          username: 'ecto1',
          type: 'message',
          subtype: 'bot_message',
          ts: '1503435956.000247',
        },
      },
    },
  },
  fullstory: {
    context: {
      apiKey: 'YOUR_FULLSTORY_API_KEY',
    },
    createEvent: {
      input: {
        name: 'Support Ticket',
        session: {
          useMostRecent: true,
        },
        properties: {
          id: 424242,
          priority: 'Normal',
          source: 'Email',
          title: 'Account locked out',
        },
      },
      output: undefined,
    },
    createUser: {
      input: {
        userId: 'xyz123',
        displayName: 'Daniel Falko',
        email: 'daniel.falko@example.com',
        properties: {
          pricingPlan: 'paid',
          popupHelp: true,
          totalSpent: 14.55,
        },
      },
      output: {
        id: '987654321',
      },
    },
    listSessions: {
      input: {
        email: 'daniel.falko@example.com',
      },
      output: {
        sessions: [
          {
            userId: '1234567890',
            sessionId: '1234567890',
            createdTime: '1411492739',
            fsUrl:
              'https://www.fullstory.com/ui/ORG_ID/discover/session/1234567890:1234567890',
          },
          {
            userId: '1234567890',
            sessionId: '0987654321',
            createdTime: '1411496904',
            fsUrl:
              'https://www.fullstory.com/ui/ORG_ID/discover/session/1234567890:0987654321',
          },
        ],
      },
    },
    getUser: {
      input: {
        id: 'xyz123',
      },
      output: {
        id: '987654321',
        userId: 'xyz123',
        displayName: 'Daniel Falko',
        email: 'daniel.falko@example.com',
        properties: {
          pricingPlan: 'paid',
          popupHelp: true,
          totalSpent: 14.55,
        },
      },
    },
    listUsers: {
      input: undefined,
      output: {
        results: [
          {
            id: '987654321',
            userId: 'xyz123',
            displayName: 'Daniel Falko',
            email: 'daniel.falko@example.com',
            properties: {
              pricing_plan: 'paid',
              popup_help: true,
              total_spent: 14.55,
            },
          },
        ],
        totalRecords: 1200,
        nextPageToken: 'asd543',
      },
    },
    deleteUser: {
      input: {
        id: '987654321',
      },
      output: undefined,
    },
    updateUser: {
      input: {
        id: '987654321',
        userId: 'xyz123',
        displayName: 'Daniel Falko',
        email: 'daniel.falko@example.com',
        properties: {
          pricing_plan: 'paid',
          popup_help: true,
          total_spent: 14.55,
        },
      },
      output: {
        id: '987654321',
      },
    },
    me: {
      input: undefined,
      output: {
        email: 'daniel@falko.com',
        orgId: 'ABC',
        role: 'ADMIN',
      },
    },
  },
  googleCalendar: {
    context: {
      accessToken: 'YOUR_GOOGLE_CAL_ACCESS_TOKEN',
    },
    listEvents: {
      input: { calendarId: 'primary', maxResults: 10 },
      output: {
        kind: 'calendar#events',
        summary: 'Primary',
        updated: '2021-08-19T18:00:00.000Z',
        timeZone: 'America/Los_Angeles',
        accessRole: 'owner',
        items: [
          {
            kind: 'calendar#event',
            id: '1',
            status: 'confirmed',
            htmlLink: 'https://www.google.com/calendar/event?eid=1',
            created: '2021-08-19T18:00:00.000Z',
            updated: '2021-08-19T18:00:00.000Z',
            summary: 'Test Event',
            description: 'This is a test event',
            location: '123 Main St, San Francisco, CA 94105, USA',
          },
        ],
      },
    },
  },
  sendGrid: {
    context: {
      apiKey: 'YOUR_SENDGRID_API_KEY',
    },
    sendEmail: {
      input: {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      },
      output: {
        id: '1',
      },
    },
  },
  pagerDuty: {
    context: {
      token: 'YOUR_PAGERDUTY_TOKEN',
    },
    listServices: {
      input: undefined,
      output: {
        services: [
          {
            id: 'PIJ90N7',
            summary: 'My Application Service',
            type: 'service',
            name: 'My Application Service',
            createdAt: '2015-11-06T11:12:51-05:00',
            status: 'active',
          },
        ],
        limit: 25,
        offset: 0,
        more: false,
        total: undefined,
      },
    },
    listIncidents: {
      input: undefined,
      output: {
        incidents: [
          {
            id: 'PT4KHLK',
            type: 'incident',
            summary: '[#1234] The server is on fire.',
            incidentNumber: 1234,
            createdAt: '2015-10-06T21:30:42Z',
            updatedAt: '2015-10-06T21:40:23Z',
            status: 'resolved',
            title: 'The server is on fire.',
            incidentKey: 'baf7cf21b1da41b4b0221008339ff357',
            service: {
              id: 'PIJ90N7',
              type: 'service_reference',
              summary: 'My Mail Service',
            },
            priority: {
              id: 'P53ZZH5',
              type: 'priority_reference',
              summary: 'P2',
            },
            resolvedAt: '2015-10-06T21:38:23Z',
            urgency: 'high',
          },
        ],
        limit: 1,
        offset: 0,
        more: true,
      },
    },
    listPriorities: {
      input: undefined,
      output: {
        priorities: [
          {
            id: 'PSLWBL8',
            type: 'priority',
            summary: 'P1',
            self: 'https://api.pagerduty.com/priorities/PSLWBL8',
            name: 'P1',
            description:
              'Critical issue that warrants public notification and liaison with executive teams',
          },
          {
            id: 'P53ZZH5',
            type: 'priority',
            summary: 'P2',
            self: 'https://api.pagerduty.com/priorities/P53ZZH5',
            name: 'P2',
            description:
              "Critical system issue actively impacting many customers' ability to use the product",
          },
          {
            id: 'PGE9YCZ',
            type: 'priority',
            summary: 'P3',
            self: 'https://api.pagerduty.com/priorities/PGE9YCZ',
            name: 'P3',
            description:
              'Stability or minor customer-impacting issues that require immediate attention from service owners',
          },
          {
            id: 'PVJPWYW',
            type: 'priority',
            summary: 'P4',
            self: 'https://api.pagerduty.com/priorities/PVJPWYW',
            name: 'P4',
            description:
              'Minor issues requiring action, but not affecting customer ability to use the product',
          },
          {
            id: 'P81SUUT',
            type: 'priority',
            summary: 'P5',
            self: 'https://api.pagerduty.com/priorities/P81SUUT',
            name: 'P5',
            description:
              'Cosmetic issues or bugs, not affecting customer ability to use the product',
          },
        ],
        limit: 25,
        offset: 0,
        more: false,
        total: undefined,
      },
    },
    createIncident: {
      input: {
        title: 'The server is on fire.',
        serviceId: 'PWIXJZS',
        priorityId: 'P53ZZH5',
        urgency: 'high',
        incidentKey: 'baf7cf21b1da41b4b0221008339ff357',
        body: 'A disk is getting full on this machine. You should investigate what is causing the disk to fill, and ensure that there is an automated process in place for ensuring data is rotated (eg. logs should have logrotate around them). If data is expected to stay on this disk forever, you should start planning to scale up to a larger disk.',
      },
      output: {
        incidentId: 'PT4KHLK',
      },
    },
    updateIncident: {
      input: {
        id: 'PT4KHLK',
        status: 'acknowledged',
      },
      output: {
        incidentId: 'PT4KHLK',
      },
    },
  },
  segment: {
    context: {
      apiKey: 'YOUR_SEGMENT_API_KEY',
    },
    alias: {
      input: {
        previousId: 'old_id',
        userId: 'new_id',
      },
      output: undefined,
    },
    group: {
      input: {
        userId: '019mr8mf4r',
        groupId: '56',
        traits: {
          name: 'Initech',
          description: 'Accounting Software',
        },
      },
      output: undefined,
    },
    page: {
      input: {
        userId: '019mr8mf4r',
        category: 'Docs',
        name: 'Node.js Library',
        properties: {
          url: 'https://segment.com/docs/connections/sources/catalog/librariesnode',
          path: '/docs/connections/sources/catalog/librariesnode/',
          title: 'Node.js Library - Segment',
          referrer: 'https://github.com/segmentio/analytics-node',
        },
      },
      output: undefined,
    },
    track: {
      input: {
        userId: '019mr8mf4r',
        event: 'Item Purchased',
        properties: {
          revenue: 39.95,
          shippingMethod: '2-day',
        },
      },
      output: undefined,
    },
    identify: {
      input: {
        userId: '019mr8mf4r',
        traits: {
          name: 'Michael Bolton',
          email: 'mbolton@example.com',
          plan: 'Enterprise',
          friends: 42,
        },
      },
      output: undefined,
    },
  },
  tenor: {
    context: {
      key: 'YOUR_TENOR_API_KEY',
    },
    search: {
      input: {
        query: 'cute cat birthday',
        limit: 5,
      },
      output: {
        results: [],
      },
    },
  },
  giphy: {
    context: {
      apiKey: 'YOUR_GIPHY_API_KEY',
    },
    search: {
      input: {
        query: 'cute cat birthday',
        limit: 5,
      },
      output: {
        data: [],
        pagination: {
          offset: 0,
          totalCount: 0,
          count: 0,
        },
        meta: {
          status: 0,
          msg: '',
          responseId: '',
        },
      },
    },
  },
  sinch: {
    context: {
      apiToken: 'YOUR_SINCH_API_KEY',
      servicePlanId: 'YOUR_SERVICE_PLAN_ID',
    },
    dryRunBatch: {
      input: {
        to: ['Phone_number_of_recipient_1', 'Phone_number_of_recipient_2'],
        from: 'YOUR_virtual_number',
        body: 'Hello ${name}! How are you?',
        parameters: {
          name: {
            Phone_number_of_recipient_1: 'recipient_name',
            Phone_number_of_recipient_2: 'recipient_name',
            default: 'default_in_place_of_name',
          },
        },
      },
      output: {
        numberOfRecipients: 2,
        numberOfMessages: 2,
        perRecipient: [
          {
            recipient: 'string',
            messagePart: 'string',
            body: 'string',
            encoding: 'string',
          },
        ],
      },
    },
    listBatches: {
      input: {
        startDate: 'YYYY-MM-DDThh:mm:ss.SSSZ',
        endDate: 'YYYY-MM-DDThh:mm:ss.SSSZ',
      },
      output: {
        batches: [
          {
            id: '01FC66621XXXXX119Z8PMV1QPQ',
            to: ['15551231234', '15551256344'],
            from: '15551231234',
            canceled: false,
            body: 'string',
            createdAt: '2019-08-24T14:15:22Z',
            modifiedAt: '2019-08-24T14:15:22Z',
            expireAt: '2019-08-24T14:15:22Z',
          },
        ],
      },
    },
    sendBatch: {
      input: {
        to: ['Phone_number_of_recipient_1', 'Phone_number_of_recipient_2'],
        from: 'YOUR_virtual_number',
        body: 'Hello ${name}! How are you?',
        parameters: {
          name: {
            Phone_number_of_recipient_1: 'recipient_name',
            Phone_number_of_recipient_2: 'recipient_name',
            default: 'default_in_place_of_name',
          },
        },
      },
      output: {
        id: '01FC66621XXXXX119Z8PMV1QPQ',
        to: ['15551231234', '15551256344'],
        from: '15551231234',
        canceled: false,
        body: 'string',
        createdAt: '2019-08-24T14:15:22Z',
        modifiedAt: '2019-08-24T14:15:22Z',
        expireAt: '2019-08-24T14:15:22Z',
      },
    },
  },
  twilio: {
    context: {
      sid: 'YOUR_TWILIO_ACCOUNT_SID',
      token: 'YOUR_TWILIO_AUTH_TOKEN',
      phone: 'YOUR_TWILIO_VIRTUAL_NUMBER',
    },
    createMessage: {
      input: {
        to: '+15557122663',
        body: 'Hi there',
      },
      output: {
        status: 'sent',
        to: '+15557122663',
        body: 'Hi there',
        from: '+15557122661',
        sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        dateCreated: 'Thu, 30 Jul 2015 20:12:31 +0000',
        dateUpdated: 'Thu, 30 Jul 2015 20:12:33 +0000',
        dateSent: 'Thu, 30 Jul 2015 20:12:33 +0000',
        numMedia: 0,
        numSegments: 1,
        uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json',
      },
    },
    listMessages: {
      input: {
        to: '+15557122663',
      },
      output: {
        pageSize: 20,
        messages: [
          {
            status: 'sent',
            to: '+15557122663',
            body: 'Hi there',
            from: '+15557122661',
            sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            dateCreated: 'Thu, 30 Jul 2015 20:12:31 +0000',
            dateUpdated: 'Thu, 30 Jul 2015 20:12:33 +0000',
            dateSent: 'Thu, 30 Jul 2015 20:12:33 +0000',
            numMedia: 0,
            numSegments: 1,
            uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json',
          },
        ],
      },
    },
  },
};
