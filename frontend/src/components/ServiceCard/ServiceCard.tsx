import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';  

export   function ServiceCard(service: APIService) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Cover image"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" style={{rowGap: 0}}>
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="green">Active</Badge>
        <Text size='xs'>Operator: 505 Solutions</Text>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button variant="gradient" gradient={{ from: 'teal', to: 'limegreen' }} fullWidth mt="md" radius="md">
        Get started
      </Button>
    </Card>
  );
}