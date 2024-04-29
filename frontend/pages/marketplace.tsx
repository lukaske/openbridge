import { FooterLinks } from "../src/components/FooterLinks/FooterLinks";
import { Center, Button, Title, Container, SimpleGrid, createStyles, rem, Card, Group, Anchor, Text, Space, Skeleton, AspectRatio, Pagination } from '@mantine/core';
import { ActionsGrid } from "../src/components/ActionsGrid/ActionsGrid";
import { IconShoppingCartFilled } from '@tabler/icons-react';
import { ServiceCard } from "../src/components/ServiceCard/ServiceCard";
import { APIService } from "../src/api/model/aPIService";
import { useApiServiceList } from "../src/api/endpoints/api-service/api-service";
import { useState } from "react";

export default function Marketplace() {
  const [activePage, setActivePage] = useState(1);
  const { classes, theme } = useStyles();
  const { data: services, error, isLoading } = useApiServiceList({ page: activePage, format: 'json'});

  return (
    <>
    <Container size="lg" mt='lg'>
        <Space h="lg" />
        <Title order={2} className={classes.title} ta="center" mt='xl'>API Marketplace</Title>
        <Text className={classes.description} ta="center" mt='lg'>
          Find the best APIs for your project. We have a wide range of APIs to choose from.
        </Text>
        <Space h="lg" />
        <SimpleGrid cols={3}       breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },]}>
            {isLoading && Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} style={{borderRadius: '0.5rem'}} visible={true}><AspectRatio ratio={360 / 430}></AspectRatio></Skeleton>)}
            {!isLoading && services?.results?.map((service: APIService) => (
                
                <ServiceCard key={service.id} service={service} />
            ))}

        </SimpleGrid>
        <Center>
            <Pagination disabled={isLoading} ta="center" mt="lg" mb="lg" value={activePage} onChange={setActivePage} total={Math.ceil(services?.count / 10) || 1} />
        </Center>

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
