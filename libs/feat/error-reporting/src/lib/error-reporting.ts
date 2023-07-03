import * as google from '@google-cloud/error-reporting';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reporting = new google.ErrorReporting({
  projectId: process.env['FIREBASE_PROJECT_ID'],
  credentials: {
    project_id: process.env['GCP_PROJECT_ID'],
    private_key_id: process.env['GCP_PRIVATE_KEY_ID'],
    private_key: process.env['GCP_PRIVATE_KEY'],
    client_email: process.env['GCP_CLIENT_EMAIL'],
    client_id: process.env['GCP_CLIENT_ID'],
  },
  // Specifies when errors are reported to the Error Reporting Console.
  // See the "When Errors Are Reported" section for more information.
  // Defaults to 'production'
  reportMode: 'production',
  // Determines the logging level internal to the library; levels range 0-5
  // where 0 indicates no logs should be reported and 5 indicates all logs
  // should be reported.
  // Defaults to 2 (warnings)
  logLevel: 2,
  serviceContext: {
    service: process.env['GCP_PROJECT_ID'],
    version: process.env['WORKSHEETS_VERSION'],
  },
});

export const errors = {
  report: async (
    err: Parameters<google.ErrorReporting['report']>[0],
    request?: Parameters<google.ErrorReporting['report']>[1]
  ) => {
    reporting.report(err, request);
  },
};
