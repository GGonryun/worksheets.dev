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

  return regex.test(email);
};

// must support international phone numbers
// must support country codes
// must support formats like +1 (555) 555-5555 and 555-555-5555 and 5555555555 and 555.555.5555 and 555 555 5555 and 1-555-555-5555
export const validatePhone = (phone: string | undefined): boolean => {
  if (!phone) return false;

  const regex = /^(\+?\d{1,2}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
  return regex.test(phone);
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string' && !Array.isArray(value) && !!value.length;
};

export const shorten = (count: number) => (text: string) => {
  return text.length > count ? `${text.substring(0, count)}...` : text;
};

// Joins a list of strings with commas and 'and' for the last item
export const grammaticalJoin = (arr: string[]) => {
  if (arr.length < 2) {
    return arr[0];
  }

  return `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`;
};

export const pad = (n: number, q: number, t: string) =>
  n.toString().padStart(q, t);
