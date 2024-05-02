import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useRouter } from 'next-nprogress-bar';
import { useForm } from '@mantine/form';
import { useLogin } from '../../hooks/auth/useLogin';
import {useEffect, useState } from 'react'

export function AuthenticationTitle() {
  const router = useRouter();
  const auth = useLogin().login;
  const [loginProcessing, setLoginProcessing] = useState(false);

  const logMeIn = (input:  { email: string, password: string, stayLoggedIn: boolean}) => {
    setLoginProcessing(true);
    auth(input).then((res) => {
      if (res){
        router.refresh();
        return true;
      }
      setLoginProcessing(false)
    });
  }

  const form = useForm({
    initialValues: { email: '', password: '', stayLoggedIn: true },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters long' : null),
    },
  });

  return (
    <Container size={420} my={100}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Haven't registered yet?{' '}
        <Anchor size="sm" component="button" onClick={() => push('/register')}>
            Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((input) => logMeIn(input))}>
        <TextInput type='email' label="Email" placeholder="sherlock.holmes@email.com" required {...form.getInputProps('email')}  />
        <PasswordInput label="Password" placeholder="********" required mt="md"  {...form.getInputProps('password')} />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" {...form.getInputProps('stayLoggedIn')}  />
          <Anchor component="button" size="sm" onClick={() => push('/forgot-password')}>
            Forgot password?
          </Anchor>
        </Group>
        <Button loading={loginProcessing} fullWidth mt="xl" type='submit'>
          Login
        </Button>
        </form>
      </Paper>
    </Container>
  );
}
