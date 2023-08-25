import { newApplicationsDatabase } from '@worksheets/data-access/applications';

const applications = newApplicationsDatabase();

export const testConnectionProperties = async (opts: {
  appId: string;
  data: Record<string, string>;
}) => {
  const validate = applications.getValidationFn(opts.appId);

  return validate(opts.data);
};
