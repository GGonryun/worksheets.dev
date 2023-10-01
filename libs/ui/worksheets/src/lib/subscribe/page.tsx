import { Email, Unsubscribe } from '@mui/icons-material';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import {
  NewsletterError,
  NewsletterMessage,
  NewsletterTopic,
} from '@worksheets/schemas-user';
import { trpc } from '@worksheets/trpc/ide';
import { TinyLogo, TinyToggle } from '@worksheets/ui-basic-style';
import { Flex, Spacing } from '@worksheets/ui-core';
import { RequiredAsterisk, useLayout } from '@worksheets/ui/common';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const defaultTopics: NewsletterTopic[] = ['newsletter', 'product', 'games'];

const topicLabels: Record<NewsletterTopic, string> = {
  newsletter: 'Newsletter',
  product: 'Product',
  games: 'Games',
};

const subscriptionMessages: Record<NewsletterMessage, string> = {
  ALREADY_SUBSCRIBED: "We've updated your subscription preferences.",
  NEW_SUBSCRIPTION: 'Thank you for subscribing!',
  UNSUBSCRIBED: 'You have been unsubscribed from our newsletter.',
};

const subscriptionErrors: Record<NewsletterError, string> = {
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_TOPIC: 'Please select at least one topic.',
  INTERNAL_SERVER_ERROR:
    "Something's wrong on our end. Please try again in a minute.",
  ALREADY_SUBSCRIBED: "You're already subscribed to our newsletter.",
  NOT_SUBSCRIBED: "You're not subscribed to our newsletter.",
};

export const SubscribePage = () => {
  const { query } = useRouter();
  const emailToUnsubscribe = query.unsubscribe as string;
  const isUnsubscribing = emailToUnsubscribe != null;

  const [email, setEmail] = useState(isUnsubscribing ? '' : emailToUnsubscribe);
  const [topics, setTopics] = useState<NewsletterTopic[]>(defaultTopics);
  const { isMobile, isTablet, isLarge } = useLayout();
  const subscribe = trpc.newsletter.subscribe.useMutation();
  const unsubscribe = trpc.newsletter.unsubscribe.useMutation();

  const handleSubmit = async () => {
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!topics.length) {
      alert('Please select at least one topic.');
    }
    let response;
    if (isUnsubscribing) {
      response = await unsubscribe.mutateAsync({
        email,
      });
    } else {
      response = await subscribe.mutateAsync({
        email,
        topics,
      });
    }
    if (response.message) {
      // clear all fields
      setEmail('');
      setTopics(defaultTopics);
      // alert user of success.
      alert(subscriptionMessages[response.message]);
    } else if (response.error) {
      alert(subscriptionErrors[response.error]);
    }
  };

  return (
    <Flex fill centered p={3}>
      <Container maxWidth="lg" disableGutters>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
          }}
        >
          <Flex p={2} spaceBetween={!isTablet} centered={isTablet}>
            <Flex column gap={3}>
              <Flex column gap={1}>
                <Typography variant="h4">
                  {isUnsubscribing ? (
                    <strong>Leave newsletter</strong>
                  ) : (
                    <strong>Join our newsletter</strong>
                  )}
                </Typography>
                {isUnsubscribing ? (
                  <Typography variant="body1" maxWidth={500}>
                    We're sad to see you go. Please enter your email address
                    below to unsubscribe from our newsletter.
                  </Typography>
                ) : (
                  <Typography variant="body1" maxWidth={500}>
                    Stay up to date with the latest news and updates from the
                    Worksheets team. We promise not to spam you.
                  </Typography>
                )}
              </Flex>
              <Flex column gap={2}>
                <Flex column gap={1}>
                  <Typography variant="body1" color="primary.dark">
                    <strong>Email</strong>
                    <RequiredAsterisk />
                  </Typography>
                  <TextField
                    variant="standard"
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </Flex>
                {!isUnsubscribing && (
                  <Flex column>
                    <Typography variant="body1" color="primary.dark">
                      <strong>Categories</strong>
                      <RequiredAsterisk />
                    </Typography>
                    <Typography variant="body2">
                      Select at least one category to receive emails for.
                    </Typography>
                    <TopicToggles topics={topics} setTopics={setTopics} />
                  </Flex>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={isUnsubscribing ? <Unsubscribe /> : <Email />}
                  onClick={handleSubmit}
                  disabled={subscribe.isLoading || !email || !topics.length}
                >
                  {isUnsubscribing ? 'Unsubscribe' : 'Subscribe'}
                </Button>

                {isTablet && (
                  <Spacing y={3}>
                    <TinyLogo
                      area={isMobile ? 200 : 300}
                      src={
                        isUnsubscribing
                          ? '/art/unsubscribe.svg'
                          : '/art/email.svg'
                      }
                      borderless
                    />
                  </Spacing>
                )}
              </Flex>
            </Flex>
            {!isTablet && (
              <Spacing all={isLarge ? 8 : 4}>
                <TinyLogo
                  area={isLarge ? 350 : 300}
                  src={
                    isUnsubscribing
                      ? '/art/electric-kickboard-accident.svg'
                      : '/art/email.svg'
                  }
                  borderless
                />
              </Spacing>
            )}
          </Flex>
        </Paper>
      </Container>
    </Flex>
  );
};
const TopicToggles: FC<{
  topics: NewsletterTopic[];
  setTopics: (topics: NewsletterTopic[]) => void;
}> = ({ topics, setTopics }) => {
  return (
    <Flex gap={1} pt={1}>
      {Object.keys(topicLabels).map((key) => {
        const topic = key as NewsletterTopic;
        return (
          <TinyToggle
            key={key}
            checked={topics.includes(topic)}
            onClick={() => {
              if (topics.includes(topic)) {
                setTopics(topics.filter((t) => t !== key));
              } else {
                setTopics([...topics, topic]);
              }
            }}
          >
            {topicLabels[topic]}
          </TinyToggle>
        );
      })}
    </Flex>
  );
};
