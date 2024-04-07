import { trpc } from '@worksheets/trpc-charity';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { validateEmail } from '@worksheets/util/strings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { NewsletterSubscriptionForm } from '@worksheets/util/types';
import { useEffect, useState } from 'react';

import { SubscriptionForm } from '../components/subscription-form';
import { EMPTY_NEWSLETTER_SUBSCRIPTION_FORM } from '../data';

export const SubscriptionFormContainer: React.FC<{
  id: string | undefined;
  hideEmail?: boolean;
}> = ({ id, hideEmail }) => {
  const snackbar = useSnackbar();

  const subscribe = trpc.newsletter.subscribe.useMutation();
  const unsubscribe = trpc.newsletter.unsubscribe.useMutation();
  const subscription = trpc.newsletter.subscription.useQuery(
    {
      id,
    },
    {
      enabled: !!id,
      retry: false,
    }
  );

  const [helperText, setHelperText] = useState('');
  const [form, setForm] = useState(EMPTY_NEWSLETTER_SUBSCRIPTION_FORM);

  useEffect(() => {
    if (
      !subscription.isRefetching &&
      !subscription.isLoading &&
      !subscription.isError &&
      subscription.data
    ) {
      setForm({
        id: subscription.data.id,
        email: subscription.data.email,
        topics: subscription.data.topics,
      });
    }
  }, [
    subscription.isError,
    subscription.isLoading,
    subscription.data,
    subscription.isRefetching,
  ]);

  const handleUpdate = (form: NewsletterSubscriptionForm) => {
    setForm(form);
    setHelperText('');
  };

  const handleSubmit = async () => {
    if (!validateEmail(form.email)) {
      return snackbar.error('Enter a valid email address.');
    }

    try {
      const data = await subscribe.mutateAsync(form);

      const message = data?.requiresConfirmation
        ? 'A confirmation email has been sent to your email address!'
        : 'Your settings have been updated!';

      setForm(data.subscription || EMPTY_NEWSLETTER_SUBSCRIPTION_FORM);
      setHelperText(message);
      snackbar.success(message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleUnsubscribe = async () => {
    const message = 'You have been unsubscribed from our newsletter.';
    try {
      await unsubscribe.mutateAsync({
        email: form.email,
      });
      await subscription.refetch();

      setHelperText(message);
      snackbar.success(message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  if (subscription.isRefetching || subscription.isFetching) {
    return <LoadingBar />;
  }
  return (
    <SubscriptionForm
      hideEmail={hideEmail}
      form={form}
      submitting={false}
      helperText={helperText}
      onUnsubscribe={handleUnsubscribe}
      onSubmit={handleSubmit}
      onUpdate={handleUpdate}
    />
  );
};
