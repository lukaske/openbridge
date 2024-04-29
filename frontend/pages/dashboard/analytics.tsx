import React from 'react';
import {Text, Title, Container, Card, Flex } from '@mantine/core';
import {CustomAppShell} from '../../src/components/CustomAppShell';
import Example from '../../src/components/AnalyticsChart/AnalyticsChart';

const Analytics: React.FC = () => {
  return (
    <div style={{height: '100%'}}>
    <Card style={{height: '50vh'}} shadow="sm" padding="lg" radius="md" withBorder>
        <Title align='center' mb='lg' order={1}>My usage of other APIs - last 14 days</Title>
        <Example />
      </Card>
      <Card style={{height: '50vh'}}  mt='lg' shadow="sm" padding="lg" radius="md" withBorder>
        <Title align='center' mb='lg' order={1}>Other's usage of my APIs - last 14 days</Title>
        <Example />
      </Card>

    </div>
  );
};

export default Analytics;