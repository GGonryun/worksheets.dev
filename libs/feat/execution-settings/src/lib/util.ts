import { MethodDefinition } from '@worksheets/apps/framework';
import { HandlerFailure } from '@worksheets/util/next';

export const closeRedirect = () => ({ url: '/oauth/close' });

export const errorRedirect = (message: string) => ({
  url: `/oauth/error?reason=${message}`,
});

export function findProperty(method: MethodDefinition, key: string) {
  if (!method.settings) {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `method does not support custom settings`,
      data: { path: method.path },
    });
  }

  const prop = method.settings[key];
  if (!prop) {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `method does not support requested setting`,
      data: { path: method.path, key },
    });
  }

  return prop;
}

export function findOAuthProperty(method: MethodDefinition, key: string) {
  const prop = findProperty(method, key);

  if (prop.type !== 'oauth') {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `unexpected property type, expected 'oauth' but received '${prop.type}'`,
    });
  }

  return prop;
}
