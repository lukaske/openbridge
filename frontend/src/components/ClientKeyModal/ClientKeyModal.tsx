import { Card, Image, Text, Flex, Button, Group, Anchor, Center, Table, LoadingOverlay, Modal, Space, ScrollArea, Pagination } from '@mantine/core';
import { APIService } from '../../api/model/aPIService';  
import { ApiModal } from '../ApiModal/ApiModal';
import { IconInfoCircle, IconX, IconPencil } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useApiServiceList, useApiServiceDestroy, useApiServicePartialUpdate } from "../../api/endpoints/api-service/api-service";
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import BillingRuleModal from '../BillingRuleModal/BillingRuleModal';
import { useClientApiKeysList, useClientApiKeysPartialUpdate, useClientApiKeysUpdate } from '../../api/endpoints/client-api-keys/client-api-keys';
import { useCurrentUser } from '../../hooks/auth/useCurrentUser';
import { useRouter  } from 'next-nprogress-bar';
import { useDisclosure } from '@mantine/hooks';
import { ServiceAPIKey } from '../../api/model';
import IssueAPIKey from './IssueApiKey';

interface ClientKeyModalProps {
  service: APIService;
  fetch: () => void;
  isDashboard?: boolean;
}

export function ClientKeyModal({ service, fetch: refetchParent, isDashboard }: ClientKeyModalProps) {
    const [activePage, setActivePage] = useState(1);
    const { data: apiKeys, isFetching, refetch: refetchData  } = useClientApiKeysList({api_service: service.id, ordering: '-created', page: activePage, format: 'json'});
    const { mutateAsync: updateAsync, isPending: isPendingUpdate } = useClientApiKeysPartialUpdate();
    const { user, refetchUser} = useCurrentUser();
    const [opened, { open, close }] = useDisclosure(false);
    const {push} = useRouter();
    let rows: any[] = [];

    const revokeApiKey = (key: ServiceAPIKey) => {
        updateAsync({prefix: key.prefix, data: {revoked: true}}).then(() => {
            notifications.show({title: 'Success', message: `API key ${key.name} revoked successfully`, color: 'green'});
            refetch();
        }).catch((error: any) => {
            notifications.show({title: 'Error', message: `Failed to revoke API key ${key.name}: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        });
    };

    const refetch = () => {
        if (activePage !== 1) setActivePage(1);
        else refetchData();
      };
    

    const openRevokeModal = (apiKey: ServiceAPIKey) =>
        modals.openConfirmModal({
        title: 'Revoke API key?',
        centered: true,
        children: (
            <Text size="sm">
            Are you sure you want to revoke <b>{service.name}</b> API key? This action is irreversible!
            </Text>
        ),
        labels: { confirm: 'Revoke', cancel: "Cancel" },
        confirmProps: { color: 'red'},
        zIndex: 250,
        onCancel:  () => {},
        onConfirm: () => revokeApiKey(apiKey),
    });

    if (apiKeys !== undefined && apiKeys.results !== undefined) {
        rows = apiKeys.results?.map((element) => (
            <tr key={element.name}>
              <td>{element.name}</td>
              <td>{element.revoked? <Text fw={700} c='red'>Revoked</Text> : <Text fw={700} c='green'>Active</Text>}</td>
              <td>{new Date(element.created).toUTCString()}</td>
              <td>
                <Flex  justify='flex-start' align="center" gap='xs' >
                    {!element.revoked? <Button disabled={element.revoked} size='xs' compact variant="subtle" color="red" onClick={() => openRevokeModal(element)}><IconX />Revoke access</Button>: ""}
                </Flex>
              </td>
            </tr>
          ));
    
    }




  return (
    <>
        {user?.user? (
        <Button leftIcon={isDashboard? <IconPencil/> :""} disabled={!service.active} fullWidth mt="md" radius="md" onClick={open}>
            {isDashboard? 'Manage API': 'Activate API'}
        </Button>
        ): (
        <Button disabled={!service.active} onClick={() => push('/login')} fullWidth mt="md" radius="md">
            Start using this API
        </Button>
        )}
        <Modal opened={opened} onClose={close} title={`API Keys - ${service.name}`} size="xl">
            <Group position="right">
                <IssueAPIKey service={service} refetchParent={refetch} />
            </Group>
            <Space h="sm" />
            {rows.length === 0 && <Button style={{pointerEvents: 'none'}} fullWidth variant='subtle' size='xs' color='gray' leftIcon={<IconInfoCircle/>} >Create an API key by clicking the button above</Button>}

            {rows.length !== 0 && <>
            <Table highlightOnHover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Center>
                <Pagination disabled={isFetching} ta="center" mt="lg" mb="lg" value={activePage} onChange={setActivePage} total={Math.ceil(apiKeys?.count / 10) || 1} />
            </Center>
            </>}
            <LoadingOverlay visible={isFetching || isPendingUpdate} overlayBlur={2} />


        </Modal>
    </>
  );
}