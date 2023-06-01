export default function Close() {
  return null;
}
if (typeof window === 'undefined') {
  // no-op
} else if (!window.opener) {
  alert('TODO: original window opener does not exist');
  window.close();
} else if (!window.opener.oauthcallback) {
  alert('TODO: window operner callback is not set');
  window.close();
} else {
  window.opener.oauthcallback();
  window.close();
}
