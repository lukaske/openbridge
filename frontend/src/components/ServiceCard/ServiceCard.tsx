import { Card, Image, Text, Badge, Button, Group, Anchor, ScrollArea, Grid, Code } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';  
import { ClientKeyModal } from '../ClientKeyModal/ClientKeyModal';

interface APIServiceProps {
  service: APIService;
  isDashboard?: boolean;
}

export function ServiceCard({service, isDashboard}: APIServiceProps) {
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
          <Grid.Col span={8}><Text fw={500}>{service?.name}</Text></Grid.Col>
          <Grid.Col span={4}>{service.active? <Badge style={{float: 'right'}} color="lime">Available</Badge>: <Badge style={{float: 'right'}}  color="red">Unavailable</Badge>}</Grid.Col>
        </Grid>
        <Text style={{width: '100%'}}  size='xs'>Operator: {service.service_provider}</Text>
      </Group>
        <Text size="xs" c="dimmed">
          {!isDashboard? service.description: (
            <>
              <Code block>https://openbridge.me/b/{service.url_compatible_name}/</Code>
              <Code mt='xs' block>Authorization: Token {'<issued_token>'}</Code>
            </>
          )}
        </Text>

      </ScrollArea>
      <ClientKeyModal service={service} isDashboard={isDashboard} fetch={() => {}} />
    </Card>
  );
}