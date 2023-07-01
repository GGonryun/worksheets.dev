export const closeRedirect = () => ({ url: '/oauth/close' });

export const errorRedirect = (message: string) => ({
  url: `/oauth/error?reason=${message}`,
});
