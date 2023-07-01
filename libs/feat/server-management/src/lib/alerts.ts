import {
  ServerAlertEntity,
  newServerAlertsDatabase,
} from '@worksheets/data-access/server-alerts';

const db = newServerAlertsDatabase();

export type ServerAlertSeverity = ServerAlertEntity['severity'];
export type ServerAlertOptions = Omit<ServerAlertEntity, 'createdAt' | 'id'>;

export const alerts = {
  send: async (opts: ServerAlertOptions) => {
    if (opts.severity === 'info') {
      console.info('[ALERT]', opts);
    }

    if (opts.severity === 'warning') {
      console.warn('[ALERT]', opts);
    }

    if (opts.severity === 'error') {
      console.error('[ALERT]', opts);
    }

    await db.insert({
      createdAt: Date.now(),
      ...opts,
    });
  },
};
