import { Card, Image, Text, Badge, Button, Group, Anchor, ScrollArea, Grid, LoadingOverlay } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';  
import { ApiModal } from '../ApiModal/ApiModal';
import { IconTrashX, IconPigMoney, IconPig, IconCoins } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useApiServiceList, useApiServiceDestroy, useApiServicePartialUpdate } from "../../api/endpoints/api-service/api-service";
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface ServiceCardManageProps {
  service: APIService;
  fetch: () => void;
}

export function ServiceCardManage({ service, fetch: refetchParent }: ServiceCardManageProps) {

  const {isPending: isPendingDelete, mutateAsync: deleteAsync} = useApiServiceDestroy();

  const deleteService = () => {
    deleteAsync({id: service.id}).then(() => {
      notifications.show({title: 'Success', message: `Service ${service.name} deleted successfully`, color: 'green'});
      refetchParent();
    });
  }; 

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete API Service',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <b>{service.name}</b>? This action is irreversible!
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: "Cancel" },
      confirmProps: { color: 'red'},
      onCancel:  () => {},
      onConfirm: () => deleteService(),
});



  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={service.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'} 
          height={160}
          alt="Cover image"
        />
      </Card.Section>

      <ScrollArea mt="md"  h={180}>

      <Group justify="space-between" mb="xs" style={{rowGap: 0}}>
        <Grid style={{width: '100%'}}>
          <Grid.Col span={8}><Text fw={500}>{service.name}</Text></Grid.Col>
          <Grid.Col span={4}>{service.active? <Badge style={{float: 'right'}} color="lime">Available</Badge>: <Badge style={{float: 'right'}}  color="red">Unavailable</Badge>}</Grid.Col>
        </Grid>
        <Text style={{width: '100%'}}  size='xs'>Operator: {service.service_provider}</Text>
      </Group>
        <Text size="xs" c="dimmed">
          {service.description}
        </Text>

      </ScrollArea>

      <Button mt='sm' leftIcon={<IconCoins/>} fullWidth radius="md" variant='filled' onClick={openDeleteModal}>API Billing Rules</Button>
      <Group mt='xs' grow spacing={'0.5rem'}>
        <ApiModal mode='edit' service={service} refetchParent={refetchParent}/>
        <Button leftIcon={<IconTrashX/>} radius="md" variant='light' color='red' onClick={openDeleteModal}>Delete</Button>
      </Group>
      <LoadingOverlay visible={isPendingDelete} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, backgroundOpacity: '0.85' }} />

    </Card>
  );
}