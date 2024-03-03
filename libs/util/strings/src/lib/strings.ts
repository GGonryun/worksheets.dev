export const validateUrl = (url: string | undefined): string | undefined => {
  if (url == null) {
    return undefined;
  }

  try {
    new URL(url);
  } catch (e) {
    return 'Must specify a valid URL starting with https://';
  }

  // url must start with https://
  if (!url.startsWith('https://')) {
    return 'URL must start with https://';
  }

  return undefined;
};

// does not support port numbers or localhost or http
export const validateHttpsUrl = (url: string | undefined): boolean => {
  const regex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  return regex.test(url ?? '');
};

export const createRandomUserName = (): string => {
  return `user${Math.floor(Math.random() * 1000000)}`;
};

export const validateEmail = (email: string | undefined): boolean => {
  if (email == null) {
    return false;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return false;
  }

  return true;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
