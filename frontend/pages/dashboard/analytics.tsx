import React from 'react';
import {Text, Title, Container, Card, Flex, LoadingOverlay } from '@mantine/core';
import {CustomAppShell} from '../../src/components/CustomAppShell';
import Example from '../../src/components/AnalyticsChart/AnalyticsChart';
import { useClientAnalyticsRetrieve } from '../../src/api/endpoints/client-analytics/client-analytics';

const Analytics: React.FC = () => {
  const {data: analytics, refetch, isRefetching: isRefetchingMyUsage} = useClientAnalyticsRetrieve();
  return (
    <div style={{height: '100%'}}>
    <Card style={{height: '50vh'}} shadow="sm" padding="lg" radius="md" withBorder>
        <Title align='center' mb='lg' order={1}>My usage of other APIs - last 14 days</Title>
        <Example data={analytics?.used} />
        <LoadingOverlay visible={isRefetchingMyUsage} />
      </Card>
      <Card style={{height: '50vh'}}  mt='lg' shadow="sm" padding="lg" radius="md" withBorder>
        <Title align='center' mb='lg' order={1}>Other's usage of my APIs - last 14 days</Title>
        <Example data={analytics?.provided} />
        <LoadingOverlay visible={isRefetchingMyUsage} />
      </Card>

    </div>
  );
};

export default Analytics;