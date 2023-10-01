import { SendOutlined } from '@mui/icons-material';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex, Spacing, TextArea } from '@worksheets/ui-core';
import { RequiredAsterisk, useLayout } from '@worksheets/ui/common';
import { useState } from 'react';

export const ContactPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { isMobile, isTablet, isLarge } = useLayout();
  const saveMessage = trpc.contact.submit.useMutation();

  const handleSubmit = async () => {
    if (!message) {
      alert('Please enter a message');
      return;
    }

    await saveMessage.mutateAsync({
      firstName,
      lastName,
      email,
      message,
    });
    // clear all fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    // alert user of success.
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
          <Flex spaceBetween={!isTablet} centered={isTablet}>
            <Flex column gap={3}>
              <Flex column gap={1}>
                <Typography variant="h4">
                  <strong>Get in touch with our team</strong>
                </Typography>
                <Typography variant="body1" maxWidth={400}>
                  Our product is not perfect. We need your help to make it
                  better. We'd love to hear from you. Please send us your
                  feedback and suggestions.
                </Typography>
              </Flex>
              <Flex column gap={2}>
                <Flex fullWidth gap={3}>
                  <TextField
                    variant="standard"
                    label="First Name"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                  />
                  <TextField
                    variant="standard"
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                  />
                </Flex>
                <Flex column gap={1}>
                  <TextField
                    variant="standard"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                  <Typography variant="caption">
                    If you do not include an email address, your feedback will
                    be anonymous.
                  </Typography>
                </Flex>

                <Spacing y={1}>
                  <TextArea
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    minRows={3}
                    placeholder="Message"
                    sx={{ width: '100%' }}
                  />
                </Spacing>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendOutlined />}
                  onClick={handleSubmit}
                  disabled={saveMessage.isLoading || !message}
                >
                  Send Message
                </Button>
                <Typography variant="caption">
                  <RequiredAsterisk /> We typically respond within 36 hours.
                </Typography>

                {isTablet && (
                  <Spacing y={3}>
                    <TinyLogo
                      area={isMobile ? 200 : 300}
                      src="/art/classroom.svg"
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
                  src="/art/classroom.svg"
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
