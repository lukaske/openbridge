import React, {useState} from 'react';
import {CustomAppShell} from '../../src/components/CustomAppShell';
import { FooterLinks } from "../../src/components/FooterLinks/FooterLinks";
import { Center, Grid, Button, Title, Container, SimpleGrid, createStyles, rem, Card, Group, Anchor, Text, Space, Skeleton, AspectRatio, Pagination } from '@mantine/core';
import { ActionsGrid } from "../../src/components/ActionsGrid/ActionsGrid";
import { IconPlus, IconShoppingCartFilled } from '@tabler/icons-react';
import { ServiceCard } from "../../src/components/ServiceCard/ServiceCard";
import { APIService } from "../../src/api/model/aPIService";
import { useApiServiceList } from "../../src/api/endpoints/api-service/api-service";


const MyAPI: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const { classes, theme } = useStyles();
  const { data: services, error, isLoading } = useApiServiceList({ page: activePage, format: 'json'});

  return (
      <>    
          <Group position="right">
            <Button leftIcon={<IconPlus />} variant="outline">Add a new API</Button>
          </Group>
          <Space h="lg" />
          <SimpleGrid cols={3}       breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },]}>
              {isLoading && Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} style={{borderRadius: '0.5rem'}} visible={true}><AspectRatio ratio={360 / 430}></AspectRatio></Skeleton>)}
              {!isLoading && services?.results?.map((service: APIService) => (
                  
                  <ServiceCard key={service.id} {...service} />
              ))}

          </SimpleGrid>
          <Center>
              <Pagination disabled={isLoading} ta="center" mt="lg" mb="lg" value={activePage} onChange={setActivePage} total={Math.ceil(services?.count / 10) || 1} />
          </Center>

      </>
  );
};

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
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

export default MyAPI;