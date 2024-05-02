import React from 'react';
import { modals } from '@mantine/modals';
import {Text, Title, Container, Card, Flex, LoadingOverlay, Group, Button, Table } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const Billing: React.FC = () => {

  return <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group position='apart'>
            <Title order={3}>My Balance: {'13.30'} €</Title>
            <Button onClick={() => notifications.show({
              title: 'Sorry!',
              message: 'Credit card top-up is not yet available.',
              color: 'red',
            })}>Top up with credit card</Button>
          </Group>
            <LoadingOverlay visible={false} />
          </Card>
        <Card shadow="sm" mt='xl' padding="lg" radius="md" withBorder>
          <Title order={3}>Billing History</Title>

          <Table>
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Amount</th>
                <th>Billing period</th>
                <th>Issue date</th>
                <th>API Service</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

            <LoadingOverlay visible={false} />
        </Card>


  </>;
};

export default Billing;