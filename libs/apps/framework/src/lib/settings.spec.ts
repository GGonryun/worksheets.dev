import { z } from 'zod';
import {
  Infer,
  newFlagSetting,
  newOAuthSetting,
  newTokenSetting,
} from './settings';

describe('newField', () => {
  it('typescript lints all fields', () => {
    const requiredFlag = newFlagSetting({
      label: 'flag 1',
      required: true,
    });

    const optionalFlag = newFlagSetting({
      label: 'flag 2',
      required: false,
    });

    const requiredToken = newTokenSetting({
      label: 'api 1',
      required: true,
    });

    const optionalToken = newTokenSetting({
      label: 'api key 2',
      required: false,
    });

    const requiredOAuth = newOAuthSetting({
      label: 'oauth 1',
      options: {},
      schema: z.object({ id: z.string() }),
      required: true,
    });

    const optionalOAuthRequiredSchema = newOAuthSetting({
      label: 'oauth 2',
      options: {},
      schema: z.object({ id: z.string() }),
      required: false,
    });

    const fields = {
      requiredFlag,
      optionalFlag,
      requiredToken,
      optionalToken,
      requiredOAuth,
      optionalOAuthRequiredSchema,
    };

    const data: Infer<typeof fields> = {
      requiredFlag: false,
      optionalFlag: undefined,
      requiredToken: 'yes',
      optionalToken: 'unknown',
      requiredOAuth: { id: 'test' },
      optionalOAuthRequiredSchema: undefined,
    };

    expect(data).not.toBeUndefined();
  });
});
