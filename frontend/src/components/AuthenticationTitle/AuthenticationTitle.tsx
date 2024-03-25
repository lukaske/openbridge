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
import {useRouter} from 'next/router';  
import { useForm } from '@mantine/form';
import { useLogin } from '../../hooks/auth/useLogin';
import {useEffect, useState } from 'react'

export function AuthenticationTitle() {
  const push = useRouter().push;
  const auth = useLogin().login;
  const [loginProcessing, setLoginProcessing] = useState(false);

  const logMeIn = (input:  { email: string, password: string, stayLoggedIn: boolean}) => {
    setLoginProcessing(true);
    auth(input).then((res) => {
      if (res){
        push('/dashboard');
        return true;
      }
      setLoginProcessing(false)
    });
  }
  const form = useForm({
    initialValues: { email: '', password: '', stayLoggedIn: true },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Neveljaven email naslov'),
      password: (value) => (value.length < 8 ? 'Geslo mora biti dolgo vsaj 8 znakov' : null),
    },
  });

  return (
    <Container size={420} my={100}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Dobrodošli nazaj!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Še nimate uporabniškega računa?{' '}
        <Anchor size="sm" component="button" onClick={() => push('/register')}>
            Ustvarite ga
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((input) => logMeIn(input))}>
        <TextInput type='email' label="Email" placeholder="uporabnik@email.com" required {...form.getInputProps('email')}  />
        <PasswordInput label="Geslo" placeholder="Vaše geslo" required mt="md"  {...form.getInputProps('password')} />
        <Group position="apart" mt="lg">
          <Checkbox label="Zapomni si me" {...form.getInputProps('stayLoggedIn')}  />
          <Anchor component="button" size="sm" onClick={() => push('/forgot-password')}>
            Pozabljeno geslo?
          </Anchor>
        </Group>
        <Button loading={loginProcessing} fullWidth mt="xl" type='submit'>
          Prijava
        </Button>
        </form>
      </Paper>
    </Container>
  );
}
