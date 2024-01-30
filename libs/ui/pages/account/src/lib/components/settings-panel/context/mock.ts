import {
  BasicInformationFormContextType,
  MockActionType,
} from '@worksheets/util/types';

export const DEFAULT_VALUES = (
  action: MockActionType
): BasicInformationFormContextType => ({
  errors: {
    username: '',
    bio: '',
  },
  values: {
    username: '',
    bio: null,
  },
  loading: false,
  isValid: () => false,
  isUpdated: () => false,
  onSubmit: action('onSubmit'),
  setFieldValue: action('setFieldValue'),
});

export const PREFILLED_VALUES = (
  action: MockActionType
): BasicInformationFormContextType => ({
  ...DEFAULT_VALUES(action),
  isValid: () => true,
  isUpdated: () => false,
  loading: false,
  values: {
    username: 'CharityGames',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
});

export const ERROR_VALUES = (
  action: MockActionType
): BasicInformationFormContextType => ({
  ...DEFAULT_VALUES(action),
  isValid: () => false,
  isUpdated: () => false,
  loading: false,
  values: {
    username: 'Charity!Games',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'.repeat(30),
  },
  errors: {
    username:
      'Username can only use alphanumeric characters, underscores and dashes.',
    bio: 'Bio field contains too many characters.',
  },
});
