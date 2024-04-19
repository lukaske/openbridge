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
import { authService } from '../../services';
import { useState } from 'react'

export function RegisrationTitle() {
  const push = useRouter().push;
  const auth = authService;
  const [loginProcessing, setLoginProcessing] = useState(false);

  const registerMe = (input: {email :string, password: string, vpassword:string, terms: boolean}) => {
    setLoginProcessing(true);
    auth.register(input).then((res) => {
      if (res){
        push('/dashboard');
      }
      else{
        setLoginProcessing(false)
      }
      }).catch((err) => {setLoginProcessing(false)});
    };
  

  const form = useForm({
    initialValues: { email: '', password: '', vpassword: '', terms: true },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters long' : null),
      vpassword: (value, values) => value !== values.password ? "Passwords don't match!" : null,
      terms: (value) => value ? null : 'You must agree to terms of use',
    },
  });

  return (
    <Container size={420} my={100}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Registration
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => push('/login')}>
            Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(registerMe)}>
        <TextInput type='email' label="Email" placeholder="sherlock.holmes@email.com" required {...form.getInputProps('email')}  />
        <PasswordInput label="Password" placeholder="********" required mt="md" {...form.getInputProps('password')} />
        <PasswordInput label="Repeat password" placeholder="********" required mt="md" {...form.getInputProps('vpassword')} />
        <Group position="apart" mt="lg">
          <Checkbox label="I agree with the terms of use" defaultChecked {...form.getInputProps('terms')} />
        </Group>

        <Button loading={loginProcessing} fullWidth mt="xl" type='submit'>
          Create an account
        </Button>
        </form>
      </Paper>
    </Container>
  );
}
