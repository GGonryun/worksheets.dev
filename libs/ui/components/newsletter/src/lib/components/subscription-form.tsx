import { LocalPostOffice, Unsubscribe } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import {
  MODIFIABLE_TOPICS,
  NEWSLETTER_TOPIC_LABELS,
} from '@worksheets/util/settings';
import { NewsletterSubscriptionForm } from '@worksheets/util/types';

export const SubscriptionForm: React.FC<{
  form: NewsletterSubscriptionForm;
  helperText: string;
  hideEmail?: boolean;
  submitting: boolean;
  onSubmit: () => void;
  onUnsubscribe: () => void;
  onUpdate: (form: NewsletterSubscriptionForm) => void;
}> = ({
  hideEmail,
  form,
  submitting,
  onUpdate,
  onUnsubscribe,
  onSubmit,
  helperText,
}) => {
  return (
    <FormGroup>
      <Column gap={2.5}>
        {!hideEmail && (
          <Column>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter your email address to subscribe to our newsletter:
            </Typography>
            <TextField
              required
              disabled={Boolean(form.id)}
              type="email"
              placeholder="Enter your email address."
              value={form.email}
              onChange={(event) =>
                onUpdate({ ...form, email: event.target.value })
              }
              helperText={
                Boolean(helperText) && (
                  <Typography variant="body3" color="success.dark">
                    {helperText}
                  </Typography>
                )
              }
            />
          </Column>
        )}
        <Column>
          <Typography variant="body2" color="text.secondary">
            Select the topics you'd like to receive updates about:
          </Typography>
          {MODIFIABLE_TOPICS.map((topic) => (
            <FormControlLabel
              key={topic}
              control={
                <Switch
                  checked={form.topics.includes(topic)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onUpdate({
                        ...form,
                        topics: [...form.topics, topic],
                      });
                    } else {
                      onUpdate({
                        ...form,
                        topics: form.topics.filter((t) => t !== topic),
                      });
                    }
                  }}
                />
              }
              label={NEWSLETTER_TOPIC_LABELS[topic]}
            />
          ))}
        </Column>
        <Row gap={1}>
          <Button
            variant="arcade"
            color="primary"
            disabled={submitting}
            onClick={onSubmit}
            startIcon={
              submitting ? (
                <CircularProgress size={20} sx={{ mr: 2 }} />
              ) : (
                <LocalPostOffice />
              )
            }
          >
            {submitting ? 'Loading...' : form.id ? 'Save Changes' : 'Subscribe'}
          </Button>
          {form.id && (
            <Button
              variant="arcade"
              color="error"
              disabled={submitting}
              onClick={onUnsubscribe}
              startIcon={
                submitting ? (
                  <CircularProgress size={20} sx={{ mr: 2 }} />
                ) : (
                  <Unsubscribe />
                )
              }
            >
              Unsubscribe
            </Button>
          )}
        </Row>
      </Column>
    </FormGroup>
  );
};
