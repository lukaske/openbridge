import { FooterLinks } from "../src/components/FooterLinks/FooterLinks";
import { Title, Container, SimpleGrid, createStyles, rem, Card, Group, Anchor, Text, Space } from '@mantine/core';
import { ActionsGrid } from "../src/components/ActionsGrid/ActionsGrid";
import { IconShoppingCartFilled } from '@tabler/icons-react';

export default function Marketplace() {

  const { classes, theme } = useStyles();

  return (
    <>
    <Container size="lg" mt='lg'>
        <Space h="lg" />
        <Title order={2} className={classes.title} ta="center" mt='xl'>API Marketplace</Title>
        <Text className={classes.description} ta="center" mt='lg'>
          Find the best APIs for your project. We have a wide range of APIs to choose from.
        </Text>


    </Container>
</>
  );
}

const useStyles = createStyles((theme) => ({
    title: {
      fontSize: rem(44),
      fontWeight: 900,
      //textDecoration: 'underline',
      textDecorationColor: '#37B24D',
      textDecorationThickness: rem(5),
      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(34),
      },
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
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
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
