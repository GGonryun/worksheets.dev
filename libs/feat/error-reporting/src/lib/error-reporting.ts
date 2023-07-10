import * as google from '@google-cloud/error-reporting';
import { ReportMode } from '@google-cloud/error-reporting/build/src/configuration';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { metrics } from '@worksheets/feat/server-monitoring';

const { PROJECT_ID, PRIVATE_KEY, PRIVATE_KEY_ID, CLIENT_EMAIL, CLIENT_ID } =
  SERVER_SETTINGS.ENVIRONMENT.VARIABLES.GCP;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reporting = new google.ErrorReporting({
  projectId: PROJECT_ID(),
  credentials: {
    project_id: PROJECT_ID(),
    private_key_id: PRIVATE_KEY_ID(),
    private_key: PRIVATE_KEY(),
    client_email: CLIENT_EMAIL(),
    client_id: CLIENT_ID(),
  },
  // Specifies when errors are reported to the Error Reporting Console.
  // See the "When Errors Are Reported" section for more information.
  // Defaults to 'production'
  reportMode: SERVER_SETTINGS.ENVIRONMENT.VARIABLES.ERROR_REPORTING
    .MODE as ReportMode,
  // Determines the logging level internal to the library; levels range 0-5
  // where 0 indicates no logs should be reported and 5 indicates all logs
  // should be reported.
  // Defaults to 2 (warnings)
  logLevel: 2,
  serviceContext: {
    service: PROJECT_ID(),
    version: `ws-${SERVER_SETTINGS.VERSION}`,
  },
});

export const errors = {
  report: async (
    err: Parameters<google.ErrorReporting['report']>[0],
    request?: Parameters<google.ErrorReporting['report']>[1]
  ) => {
    console.error(err);
    metrics.increment({ type: 'errors' });
    reporting.report(err, request);
  },
};
