import {
  ApplicationDetails,
  ListApplicationMethodsResponse,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';
import {
  Application,
  ApplicationKeys,
  Applications,
  Method,
  registry,
} from '@worksheets/apps-registry';
import { printZodSchema } from '@worksheets/util-json';
import { sampleData } from '@worksheets/apps-sample-data';
export interface ApplicationsDatabase {
  getApp(id: string): ApplicationDetails;
  list(): ListApplicationsResponse;
  getMethods(id: string): ListApplicationMethodsResponse;
}

export const newApplicationsDatabase = (): ApplicationsDatabase => {
  return {
    getApp: (id: string) => {
      const key = id as ApplicationKeys;
      const app = registry[key];
      return convertApplicationDefinition(key, app);
    },
    list: () => {
      return Object.keys(registry).map((id) => {
        const key = id as ApplicationKeys;
        const app = registry[key];
        return convertApplicationDefinition(key, app);
      });
    },
    getMethods: (appId: string): ListApplicationMethodsResponse => {
      const app = registry[appId as ApplicationKeys];
      return Object.keys(app.methods).map((methodId) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const method: Method<any, any, any, any> =
          app.methods[methodId as keyof typeof app.methods];

        return {
          id: methodId,
          label: method.label ?? methodId,
          description: method.description ?? undefined,
          input: printZodSchema(method.input),
          output: printZodSchema(method.output),
          example: createExample(appId, methodId),
        };
      });
    },
  };
};

export const convertApplicationDefinition = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app: Application<any, any, any, any>
): ApplicationDetails => ({
  id: id,
  name: app.label ?? id,
  logo: app?.logo ?? '',
  description: app.description ?? '',
});

export const createExample = (
  appId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodId: string
  // method: Method<any, any, any, any>
) => {
  const path = `${appId}.${methodId}`;
  const clientContext = format({ apiKey: 'YOUR_API_KEY' });
  const appContext = accessData(appId, methodId, 'context');
  const inputData = accessData(appId, methodId, 'input');
  return `
// Example for ${path}
const client = newClient(${clientContext})

// SDK provides type-safety and intellisense
const ${appId} = client.${appId}(${appContext})

// Optional parameters are omitted from examples
const data = ${path}(${inputData})

console.log(data);
/*
 ${accessData(appId, methodId, 'output')}
*/
`.trim();
};

const format = (input: unknown) => {
  return JSON.stringify(input, null, 2);
};

const accessData = (
  appId: string,
  methodId: string,
  key: 'input' | 'output' | 'context'
) => {
  const aid = appId as ApplicationKeys;
  const mid = methodId as keyof Applications[typeof aid]['methods'];
  const data = sampleData[aid][mid][key];
  return format(data);
};
