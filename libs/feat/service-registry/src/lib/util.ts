import { newServiceConfigurationsDatabase } from '@worksheets/data-access/service-configurations';

const configs = newServiceConfigurationsDatabase();

export const findServiceConfiguration = async (opts: {
  userId: string;
  serviceId: string;
}) => {
  const { userId, serviceId } = opts;
  const config = await configs.query(
    { f: 'userId', o: '==', v: userId },
    { f: 'serviceId', o: '==', v: serviceId }
  );

  if (config.length < 1) {
    return undefined;
  }

  if (config.length > 1) {
    console.warn(
      `found too many configurations (${config.length}) for ${userId} and ${serviceId}`
    );
  }

  return config[0];
};
