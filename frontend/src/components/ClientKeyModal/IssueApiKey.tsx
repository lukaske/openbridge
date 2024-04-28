import React from 'react';
import { Modal, Button, Group, LoadingOverlay, Code, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BillingRule, ServiceAPIKey } from '../../api/model';
import { IconPlus, IconCoins, IconInfoCircle, IconPencil, IconX } from '@tabler/icons-react';
import { APIService } from '../../api/model';
import { useBillingRuleCreate, useBillingRuleUpdate } from '../../api/endpoints/billing-rule/billing-rule';
import { notifications } from '@mantine/notifications';
import { useApiServiceCreate } from '../../api/endpoints/api-service/api-service';
import { useClientApiKeysCreate } from '../../api/endpoints/client-api-keys/client-api-keys';
import NewFormComponent from './Form';

export type RuleDetailsModalInterface = {
    // Props type definition
    refetchParent?: () => void;
    service?: APIService;
};

const IssueAPIKey: React.FC = ({refetchParent, service}: RuleDetailsModalInterface) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {isPending: pendingCreation, mutateAsync: createAsync} = useClientApiKeysCreate();
    const [ key, setKey ] = React.useState<string>('foo');

    const createApiKey = async (apiKey: ServiceAPIKey) => {
        createAsync({data: apiKey}).then((response) => {
            setKey(response.key);
            notifications.show({message: 'API Key created successfully', color: 'green'});
            if (refetchParent) refetchParent();
        }).catch((error: any) => {
            notifications.show({message: `API Key creation failed: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        })
    };

    return (<>
        <Modal opened={opened} onClose={close} zIndex={225} title={'New API Key'}>
            {key === 'foo' && <NewFormComponent actionFunction={createApiKey} service={service}/>}
            {key !== 'foo' && (
                <>
                <Space h='sm'/>
                <Text align='center' size={'sm'} c='red'>Please save your API Key securely! You won't be able to see it again after closing this window!</Text>
                <Code mt='sm' block color="blue">{key}</Code>
                <Group position="right" mt="lg">
                    <Button onClick={() => {
                        close()
                        setKey('foo');
                    }}>I have saved my API Key</Button>
                </Group>
                </>
            )}
            <LoadingOverlay visible={pendingCreation} />
        </Modal>
        <Button size='xs' leftIcon={<IconPlus />} onClick={open} variant="filled">Issue new API Key</Button>
        
    </>

    );
};

export default IssueAPIKey;