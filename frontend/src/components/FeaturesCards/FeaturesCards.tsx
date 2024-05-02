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
  Code
} from '@mantine/core';
import { IconHammer, IconApi, IconCoins } from '@tabler/icons-react';

const mockdata = [
  {
    title: '1. Build your API',
    description:
      'Begin by building your API according to your specifications and requirements. This could involve creating endpoints, defining data structures, and implementing functionalities that your service will offer.',
    icon: IconHammer,
  },
  {
    title: '2. Expose it via Open Bridge',
    description:
      'Once your API is ready, leverage OpenBridge to expose it securely to potential consumers via our API Marketplace. OpenBridge acts as a billing proxy, handling payments according to your own set of billing rules.',
    icon: IconApi,
  },
  {
    title: '3. Get paid for your services',
    description:
      "As consumers access your API through the Marketplace, you'll receive payments for the services rendered, allowing you to monetize your API effectively and generate revenue.",
    icon: IconCoins,
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
        How does it work?
      </Title>

      <SimpleGrid cols={3} spacing="xl" mt={25} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
