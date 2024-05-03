import React, {useState} from 'react';
import { modals } from '@mantine/modals';
import {Text, Title, Container, Card, Flex, LoadingOverlay, Group, Button, Table, Center, Pagination } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useClientBalanceList } from '../../src/api/endpoints/client-balance/client-balance';
import { useClientLedgerList } from '../../src/api/endpoints/client-ledger/client-ledger';
import { UserLedger } from '../../src/api/model';
import { useGenerateBillsRetrieve } from '../../src/api/endpoints/generate-bills/generate-bills';

const Billing: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const {data: balance, refetch: refetchBalance, isFetching: isRefetchingBalance} = useClientBalanceList();
  const {data: billingHistory, refetch: refetchLedger, isFetching: isRefetchingBillingHistory} = useClientLedgerList({page: activePage, ordering: '-created_at'});
  const { data: bill, refetch: apiGenerateBills, isFetching } = useGenerateBillsRetrieve({query: {enabled: false}});

  const refetchData = () => {
    if (activePage !== 1) setActivePage(1);
    else refetchLedger();
  };

  const generateBills = () => {
    apiGenerateBills().then(() => {
      notifications.show({title: 'Success', message: 'Billing cron job completed successfully', color: 'green'});
      refetchData();
      refetchBalance();
    }).catch((error: any) => {
      notifications.show({title: 'Error', message: `Failed to start billing cron job: ${JSON.stringify(error.response?.data)}`, color: 'red'});
    });
  };

  function getMonthAndYearFromDate(date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${year}`;
  }


  const rows = billingHistory?.results?.map((element: UserLedger) => {
    console.log(element)
    const credit = parseFloat(element.credit) || 0;
    const debit = parseFloat(element.debit) || 0;
    const balance = debit - credit;  
    return(
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{balance.toFixed(3)}</td>
      <td>{getMonthAndYearFromDate(new Date(element.billing_period))}</td>
      <td>{new Date(element.created_at).toUTCString()}</td>
      <td>{`${element.api_service.name} [${element.api_service.id}]`}</td>
      <td>{element.description}</td>
    </tr>
  )});


  return <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group position='apart'>
            <Title order={3}>My Balance: {parseFloat(balance?.balance) || '--'} €</Title>
            <Button style={{display: 'none'}} onClick={() => notifications.show({
              title: 'Sorry!',
              message: 'Credit card top-up is not yet available.',
              color: 'red',
            })}>Top up with credit card</Button>
            <Button onClick={generateBills} loading={isFetching}>Run billing cron job</Button>
          </Group>
            <LoadingOverlay visible={isRefetchingBalance} />
          </Card>
        <Card shadow="sm" mt='xl' padding="lg" radius="md" withBorder>
          <Title order={3}>Billing History</Title>

          <Table mt='lg'>
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Amount (€)</th>
                <th>Billing period</th>
                <th>Date of issue</th>
                <th>API Service</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Center>
              <Pagination disabled={isRefetchingBillingHistory} ta="center" mt="lg" mb="lg" value={activePage} onChange={setActivePage} total={Math.ceil(billingHistory?.count / 9) || 1} />
          </Center>

            <LoadingOverlay visible={isRefetchingBillingHistory} />
        </Card>


  </>;
};

export default Billing;