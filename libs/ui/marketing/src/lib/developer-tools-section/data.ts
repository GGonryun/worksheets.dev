export const apiEndpoint = [
  {
    id: 'create-user',
    appId: 'fullstory',
    name: 'Create User',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/fullstory.svg',
  },
  {
    id: 'track-event',
    appId: 'segment',
    name: 'Track Event',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/segment.svg',
  },
  {
    id: 'create-vault',
    appId: 'worksheets',
    name: 'Create Vault',
    logo: '/logo.svg',
  },
  {
    id: 'list-user-sessions',
    appId: 'fullstory',
    name: 'List User Sessions',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/fullstory.svg',
  },
  {
    id: 'send-email',
    appId: 'gmail',
    name: 'Send Email',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
  },
  {
    id: 'create-incident',
    appId: 'pagerduty',
    name: 'Create Incident',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/pagerduty.svg',
  },
];

export const programmingLanguages = [
  {
    id: 'bash',
    name: 'cURL',
    logo: '/art/languages/bash.svg',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    logo: '/art/languages/js.svg',
  },
  {
    id: 'go',
    name: 'Go',
    logo: '/art/languages/go.svg',
  },
  {
    id: 'java',
    name: 'Java',
    logo: '/art/languages/java.svg',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    logo: '/art/languages/kotlin.svg',
  },
  {
    id: 'python',
    name: 'Python',
    logo: '/art/languages/python.svg',
  },
  {
    id: 'ruby',
    name: 'Ruby',
    logo: '/art/languages/ruby.svg',
  },
  {
    id: 'rust',
    name: 'Rust',
    logo: '/art/languages/rust.svg',
  },
];

export const curlSample = `
  curl 
  --request POST 'http://registry.worksheets.dev/v1/fullstory/users'
  --header 'Content-Type: application/json'
  --header 'Authorization: Bearer <WORKSHEETS_API_KEY>'
  -d {
    "input": {
      "userId": "xyz123",
      "displayName": "Daniel Falko",
      "email": "daniel.falko@example.com",
      "properties": {
        "pricingPlan": "paid",
        "popupHelp": true,
        "totalSpent": 14.55
      }
    },
    "context": {
      "apiKey": "YOUR_FULLSTORY_API_KEY"
    }
  }
  `.trim();
