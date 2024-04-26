import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Table, LoadingOverlay, Group, Space } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';
import { IconPlus, IconCoins, IconInfoCircle } from '@tabler/icons-react';
import { useBillingRuleList } from '../../api/endpoints/billing-rule/billing-rule';
import { BillingRule } from '../../api/model';
import { useEffect } from 'react';

interface BillingRuleModalProps {
    service: APIService;
}

const BillingRuleModal: React.FC<BillingRuleModalProps> = ({ service }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: billingRules, error, isLoading, refetch, isFetching } = useBillingRuleList({ api_service: service.id }, { query: { enabled: false}});
    let rows: any[] = [];

    useEffect(() => {
        if (opened) refetch();
    }, [opened])

    if (billingRules !== undefined && billingRules.results !== undefined) {
        rows = billingRules.results?.map((element) => (
            <tr key={element.name}>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>{element.regex}</td>
              <td>{element.price_per}</td>
              <td>{element.rule_level}</td>
              <td>{new Date(element.created_at).toUTCString()}</td>
            </tr>
          ));
    
    }
    
    return (
        <>
          <Modal opened={opened} onClose={close} title={<Text>Billing rules - {service?.name}</Text>} size='100%'>
            <Group position="right">
                <Button size='xs' leftIcon={<IconPlus />} onClick={() => {}} variant="subtle">New Billing Rule</Button>
            </Group>
            <Space h="sm" />

             {rows.length === 0 && <Button fullWidth variant='subtle' size='xs' color='gray' leftIcon={<IconInfoCircle/>} >Add Billing Rules by clicking the button above.</Button>}

            {rows.length !== 0 && <>

            <Table highlightOnHover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Regex</th>
                    <th>Price</th>
                    <th>Priority</th>
                    <th>Created</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            </>}
            <LoadingOverlay visible={isFetching} overlayBlur={2} />
          </Modal>
    
          <Button mt='sm' leftIcon={<IconCoins/>} fullWidth radius="md" variant='filled' onClick={open}>API Billing Rules</Button>
        </>
      );

};

export default BillingRuleModal;