import { Button } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { RECAPTCHA_SITE_KEY } from '@worksheets/ui/env';
import { TaskFormProps } from '@worksheets/util/tasks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { MouseEventHandler, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { TaskCompleteNotice } from './task-complete-notice';

export const CatpchaForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  const snackbar = useSnackbar();
  const verify = trpc.user.integrations.recaptcha.verify.useMutation();
  const captchaRef = useRef<ReCAPTCHA>(null);
  if (task.status === 'COMPLETED') {
    return <TaskCompleteNotice />;
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!captchaRef.current) {
      alert('Captcha ref is not available');
    } else {
      try {
        const token = captchaRef.current.getValue();
        if (!token) {
          snackbar.error('Captcha token is missing');
          return;
        }
        const result = await verify.mutateAsync({ token });
        if (!result) {
          snackbar.error('Captcha verification failed');
          return;
        }
        captchaRef.current.reset();
        actions.onSubmit({
          repetitions: 1,
        });
      } catch (error) {
        snackbar.error(parseTRPCClientErrorMessage(error));
      }
    }
  };

  return (
    <Column gap={2}>
      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={captchaRef} />
      <Button
        variant="arcade"
        onClick={handleSubmit}
        disabled={verify.isLoading || !captchaRef.current?.getValue()}
        sx={{
          display: !captchaRef.current?.getValue() ? 'none' : 'block',
        }}
      >
        Submit Captcha
      </Button>
    </Column>
  );
};
