import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';

const mockdata = [
  {
    title: '1. Oblikujte obrazec',
    description:
      'V drag-and-drop (povleci-in-spusti) grafičnem urejevalniku dodate željena polja in obrazec oblikujete.',
    icon: IconGauge,
  },
  {
    title: '2. Objavite obrazec',
    description:
      'Generiran obrazec kopirate in objavite na vaši spletni stran ali aplikaciji.',
    icon: IconUser,
  },
  {
    title: '3. Prenesite zbrane odzive',
    description:
      'Spremljajte prejete odzive in jih prenesite za nadaljno obdelavo.',
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">

      <Title order={2} className={classes.title} ta="left" mt="sm">
        Kako deluje platforma?
      </Title>

      <SimpleGrid cols={3} spacing="xl" mt={25} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
