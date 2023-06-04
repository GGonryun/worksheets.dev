// throws errors if the url does not have a query string, returns empty string if not found.
export function getQueryParameter(url: string, target: string) {
  const urlParts = url.split('?');
  if (urlParts.length < 2) {
    throw new Error('url does not have enough parts');
  }

  const query = urlParts[1];
  const pairs = query.split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key === target) {
      return value;
    }
  }
  return '';
}
