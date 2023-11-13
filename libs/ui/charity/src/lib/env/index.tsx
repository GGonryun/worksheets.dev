const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!ROOT_DOMAIN) throw new Error('Missing NEXT_PUBLIC_ROOT_DOMAIN env var');

const PROTOCOL = ROOT_DOMAIN.includes(':') ? 'http' : 'https';

export { ROOT_DOMAIN, PROTOCOL };
