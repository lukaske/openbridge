import {
  TextInput,
  Button,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
} from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useForm } from '@mantine/form';
import { authPasswordResetCreate } from '../../api/endpoints/auth/auth';
import { useState } from 'react';
import { PasswordReset as PR } from '../../api/model/passwordReset';

export function ForgotPassword() {
  const { push } = useRouter();
  const [resetProcessing, setResetProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = async (email: string) => {
    const data: PR = { email, format: 'json'};
    setResetProcessing(true);
    try {
      await authPasswordResetCreate(data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setResetProcessing(false);
    }
  };

  const form = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Container size={460} my={100}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Forgotten password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to reset password.
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        {isSuccess ? (
          <>
          <Text align="center" color='green'>
            Password reset email has been sent if account with the provided email exists.
            <br></br>
            <br></br>
            <Anchor color="dimmed" size="sm" onClick={() => push('/login')}>
              Back to login
            </Anchor>

          </Text>

          </>

          
        ) : null}
        <form hidden={isSuccess} onSubmit={form.onSubmit((input) => handleReset(input.email))}>
          <TextInput
            type="email"
            label="Email"
            placeholder="sherlock.holmes@email.com"
            required
            {...form.getInputProps('email')}
          />
          <Group position="apart" mt="lg">
            <Anchor color="dimmed" size="sm" onClick={() => push('/login')}>
              Back to login
            </Anchor>
            <Button loading={resetProcessing} type="submit">
              Request password reset
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
