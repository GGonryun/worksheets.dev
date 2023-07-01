import {
  ServerOperationLimitEntity,
  newServerOperationLimitDatabase,
} from '@worksheets/data-access/server-limits';
import {
  addDurationToCurrentTime,
  addMinutesToCurrentTime,
} from '@worksheets/util/time';
import { settings } from '../settings';
import { ServerAlertSeverity, alerts } from '../alerts';

const operations = newServerOperationLimitDatabase();

const getOperationLimits = async (id: OperationType) => {
  if (await operations.has(id)) {
    return await operations.get(id);
  } else {
    return await operations.insert({
      id,
      quantity: 0,
      // force replenish after request
      replenish: addMinutesToCurrentTime(-1).getTime(),
    });
  }
};

type RequestOptions = {
  id: OperationType;
  quantity: number;
};

type OperationType = ServerOperationLimitEntity['id'];

const getReplenishQuantity = async (id: OperationType): Promise<number> => {
  const quantities = await settings.access('replenish-server-quantities', id);
  return Number(quantities[id]);
};

const getNextReplenishInterval = async (id: OperationType): Promise<number> => {
  const interval = await settings.access('replenish-server-intervals', id);
  return addDurationToCurrentTime({
    minutes: interval[id],
  }).getTime();
};

const shouldReplenish = (limits: ServerOperationLimitEntity) => {
  return limits.replenish < Date.now();
};

const alertProximityToLimit = async (limits: ServerOperationLimitEntity) => {
  // get default value
  const defaultLimit = await getReplenishQuantity(limits.id);

  // get current value
  const currentLimit = limits.quantity;

  // alert if we were close to running out of resources
  const percentage = currentLimit > 0 ? currentLimit / defaultLimit : 0;

  const severity = await calculateAlertThresholdSeverity(percentage);
  if (severity) {
    return await alerts.send({
      severity,
      message: `Server operation limit replenished below acceptable threshold`,
      data: {
        id: limits.id,
        currentLimit,
        defaultLimit,
        percentage,
      },
    });
  }
};

export const calculateAlertThresholdSeverity = async (
  percentage: number
): Promise<ServerAlertSeverity | undefined> => {
  if (
    await settings.below(
      'replenish-server-resource-alert-threshold-info',
      percentage
    )
  ) {
    if (
      await settings.below(
        'replenish-server-resource-alert-threshold-warning',
        percentage
      )
    ) {
      if (
        await settings.below(
          'replenish-server-resource-alert-threshold-error',
          percentage
        )
      ) {
        return 'error';
      }
      return 'warning';
    }
    return 'info';
  }
  return undefined;
};

// returns true if the user can access the resource
export const request = async (opts: RequestOptions) => {
  const limits = await getOperationLimits(opts.id);
  // should limits be replenished?
  if (shouldReplenish(limits)) {
    await alertProximityToLimit(limits);

    limits.quantity = await getReplenishQuantity(opts.id);
    limits.replenish = await getNextReplenishInterval(opts.id);

    await operations.update(limits);
    return true;
  }

  if (limits.quantity < 0) {
    return false;
  }

  limits.quantity -= opts.quantity;
  await operations.update(limits);
  return true;
};
