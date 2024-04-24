import { Card, Image, Text, Badge, Button, Group, Anchor, ScrollArea, Grid } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';  
import { ApiModal } from '../ApiModal/ApiModal';
import { IconTrashX } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useApiServiceList, apiServiceDestroy } from "../../api/endpoints/api-service/api-service";

export function ServiceCardManage(service: APIService) {

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
      closeOnConfirm: false,
      onCancel: async () => await setTimeout(() => {}, 1000),
      onConfirm: async () => await apiServiceDestroy(service.id),
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

      <Group spacing={'0.5rem'}>

      <ApiModal mode='edit' serviceId={service.id} />
      <Button leftIcon={<IconTrashX/>} fullWidth radius="md" variant='light' color='red' onClick={openDeleteModal}>Delete</Button>


      </Group>

    </Card>
  );
}