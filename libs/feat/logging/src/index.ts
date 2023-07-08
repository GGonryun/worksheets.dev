import * as bunyan from 'bunyan';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const { PROJECT_ID, PRIVATE_KEY, CLIENT_EMAIL } =
  SERVER_SETTINGS.ENVIRONMENT.VARIABLES.GCP;

export const logger = bunyan.createLogger({
  name: 'worksheets-server',
  streams: [
    // Log to the console at 'info' and above
    { stream: process.stdout, level: 'info' },
    // And log to Cloud Logging, logging at 'info' and above
  ],
});

if (SERVER_SETTINGS.ENVIRONMENT.IS_PRODUCTION()) {
  logger.info('Adding GCP to log streams');
  // Creates a Bunyan Cloud Logging client
  const loggingBunyan = new LoggingBunyan({
    projectId: PROJECT_ID(),
    redirectToStdout: true,
    credentials: {
      private_key: PRIVATE_KEY(),
      client_email: CLIENT_EMAIL(),
    },
  });
  logger.addStream(loggingBunyan.stream('info'));
} else {
  logger.info('Not adding GCP to log streams');
}
