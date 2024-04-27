import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Text, Table, LoadingOverlay, Group, Space, ActionIcon, Flex } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';
import { IconPlus, IconCoins, IconInfoCircle, IconPencil, IconX } from '@tabler/icons-react';
import { useBillingRuleDestroy, useBillingRuleList } from '../../api/endpoints/billing-rule/billing-rule';
import { BillingRule } from '../../api/model';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import EditDetails from './Details';

interface BillingRuleModalProps {
    service: APIService;
}

const BillingRuleModal: React.FC<BillingRuleModalProps> = ({ service }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: billingRules, error, isLoading, refetch, isFetching } = useBillingRuleList({ api_service: service.id, ordering: 'created_at' }, { query: { enabled: false}});
    const { mutateAsync: deleteAsync, isPending: isPendingDelete } = useBillingRuleDestroy();
    let rows: any[] = [];

    const deleteBillingRule = (rule: BillingRule) => {
        deleteAsync({id: rule.id}).then(() => {
            notifications.show({title: 'Success', message: `Billing rule ${rule.name} deleted successfully`, color: 'green'});
            refetch();
        }).catch((error: any) => {
            notifications.show({title: 'Error', message: `Failed to delete billing rule ${rule.name}: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        });
    };    

  const openDeleteModal = (rule: BillingRule) =>
    modals.openConfirmModal({
      title: 'Delete Billing Rule?',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <b>{rule.name}</b>? This action is irreversible!
        </Text>
      ),
      zIndex: 250,
      labels: { confirm: 'Delete', cancel: "Cancel" },
      confirmProps: { color: 'red'},
      onCancel:  () => {},
      onConfirm: () => deleteBillingRule(rule),
});


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
              <td>
                <Flex  justify='center' align="center" gap='xs' >
                    <EditDetails service={service} mode='edit' rule={element} refetchParent={refetch} />
                    <ActionIcon size='xs' variant="filled" color="red" onClick={() => openDeleteModal(element)}><IconX /></ActionIcon>
                </Flex>
              </td>
              <td>{new Date(element.created_at).toUTCString()}</td>
            </tr>
          ));
    
    }
    
    return (
        <>
          <Modal opened={opened} onClose={close} title={<Text>Billing rules - {service?.name}</Text>} size='80%'>
            <Group position="right">
              <EditDetails service={service} mode='create' refetchParent={refetch}/>
            </Group>
            <Space h="sm" />

             {rows.length === 0 && <Button style={{pointerEvents: 'none'}} fullWidth variant='subtle' size='xs' color='gray' leftIcon={<IconInfoCircle/>} >Add Billing Rules by clicking the button above</Button>}

            {rows.length !== 0 && <>

            <Table highlightOnHover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Regex</th>
                    <th>Price</th>
                    <th>Priority</th>
                    <th>Priority</th>
                    <th>Created</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            
            </>}
            <LoadingOverlay visible={isFetching || isPendingDelete} overlayBlur={2} />
          </Modal>
    
          <Button mt='sm' leftIcon={<IconCoins/>} fullWidth radius="md" variant='filled' onClick={open}>API Billing Rules</Button>
        </>
      );

};

export default BillingRuleModal;