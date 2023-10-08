import { useLocalStorage } from '@worksheets/ui-core';

export const usePlayer = () => {
  const [isNew, setIsNew, loadingNew, clearNew] = useLocalStorage(
    'first-time',
    true
  );
  const [consent, setConsent, loadingConsent, clearConsent] = useLocalStorage(
    'consent',
    false
  );

  return {
    loading: loadingNew || loadingConsent,
    isNew,
    setIsNew,
    consent,
    setConsent,
    clear: () => {
      clearNew();
      clearConsent();
    },
  };
};
