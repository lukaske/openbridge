import React, {useEffect, useState} from 'react';
import { Center, Grid, Button, Title, Container, SimpleGrid, createStyles, rem, Card, Group, Anchor, Text, Space, Skeleton, AspectRatio, Pagination } from '@mantine/core';
import { ServiceCardManage } from "../../src/components/ServiceCard/ServiceCardManage";
import { APIService } from "../../src/api/model/aPIService";
import { useApiServiceList, apiServiceDestroy } from "../../src/api/endpoints/api-service/api-service";
import { useCurrentUser } from '../../src/hooks/auth/useCurrentUser';
import { ApiModal } from '../../src/components/ApiModal/ApiModal';


const MyAPI: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const { classes, theme } = useStyles();
  const { user, refetchUser } = useCurrentUser();
  const { data: services, error, isLoading, refetch, isFetching } = useApiServiceList({ page: activePage, format: 'json', owner: user?.user.pk || -1});
  
  const refetchData = () => {
    if (activePage !== 1) setActivePage(1);
    else refetch();
  };
  
  return (
      <>    
          <Group position="right">
            <ApiModal mode='create' />
          </Group>
          <Space h="lg" />
          <SimpleGrid cols={3}       breakpoints={[
          { maxWidth: 'md', cols: 3, spacing: 'md' },
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },]}>
              {(isFetching) && Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} style={{borderRadius: '0.5rem'}} visible={true}><AspectRatio ratio={360 / 430}></AspectRatio></Skeleton>)}
              {!isFetching && services?.results?.map((service: APIService) => (
                  
                  <ServiceCardManage key={service.id} fetch={refetchData  } service={service}  />
              ))}

          </SimpleGrid>
          <Center>
              <Pagination disabled={isFetching} ta="center" mt="lg" mb="lg" value={activePage} onChange={setActivePage} total={Math.ceil(services?.count / 9) || 1} />
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