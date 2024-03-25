import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export function ForgotPassword() {
  const { classes } = useStyles();
  const { push } = useRouter();
  return (
    <Container size={460} my={100} >
      <Title className={classes.title} align="center">
        Pozabljeno geslo?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Vnesite vaš email naslov za ponastavitev.
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Email" placeholder="uporabnik@email.com" required />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft size={rem(12)} stroke={1.5} />
              <Box ml={5} onClick={() => push('/login')}>Nazaj na prijavo</Box>
            </Center>
          </Anchor>
          <Button className={classes.control}>Ponastavi geslo</Button>
        </Group>
      </Paper>
    </Container>
  );
}
