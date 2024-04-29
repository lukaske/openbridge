import React, {useEffect, useState} from 'react';
import { Center, Button, Title, Container, Box, SimpleGrid, createStyles, rem, Card, Group, Anchor, Text, Space, Skeleton, AspectRatio, Pagination } from '@mantine/core';
import { ServiceCard } from "../../src/components/ServiceCard/ServiceCard";
import { APIService } from "../../src/api/model/aPIService";
import { useCurrentUser } from '../../src/hooks/auth/useCurrentUser';
import { useRouter  } from 'next-nprogress-bar';
import { IconBuildingStore } from '@tabler/icons-react';
import { useClientServicesList } from '../../src/api/endpoints/client-services/client-services';

const ActivatedAPI: React.FC = () => {
  const { push } = useRouter();
  const [activePage, setActivePage] = useState(1);
  const { classes, theme } = useStyles();
  const { user, refetchUser } = useCurrentUser();
  const { data: services, error, isLoading, refetch, isFetching } = useClientServicesList({ page: activePage, format: 'json'});
  
  const refetchData = () => {
    if (activePage !== 1) setActivePage(1);
    else refetch();
  };

  return (
          <Container size="lg" p={0}>

          <Group position="right">
                <Button leftIcon={<IconBuildingStore size={20} />} variant="filled" onClick={() => push('/marketplace')}>Visit API Marketplace</Button>
          </Group>
          <Space h="lg" />
          <SimpleGrid cols={3}       breakpoints={[
          { minWidth: 'lg', cols: 3, spacing: 'lg'},  
          { minWidth: 'md', cols: 2, spacing: 'md' },
          { minWidth: 'sm', cols: 2, spacing: 'sm' },
          { minWidth: 'xs', cols: 1, spacing: 'sm' },]}>
              {(isFetching) && Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} style={{borderRadius: '0.5rem'}} visible={true}><AspectRatio ratio={360 / 430}></AspectRatio></Skeleton>)}
              {!isFetching && services?.results?.map((service: APIService) => (
                  
                  <ServiceCard key={service.id} service={service} isDashboard={true} />
              ))}

          </SimpleGrid>
          <Center>
              <Pagination disabled={isFetching} ta="center" mt="lg" mb="lg" value={activePage} onChange={setActivePage} total={Math.ceil(services?.count / 9) || 1} />
          </Center>
      </Container>

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

export default ActivatedAPI;