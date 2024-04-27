import React from 'react';
import { Modal, Button, ActionIcon, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BillingRule } from '../../api/model';
import { IconPlus, IconCoins, IconInfoCircle, IconPencil, IconX } from '@tabler/icons-react';
import BillingRuleForm from './Form';
import { APIService } from '../../api/model';
import { useBillingRuleCreate, useBillingRuleUpdate } from '../../api/endpoints/billing-rule/billing-rule';
import { notifications } from '@mantine/notifications';

export type RuleDetailsModalInterface = {
    // Props type definition
    mode: 'create' | 'edit';
    rule?: BillingRule;
    refetchParent?: () => void;
    service: APIService;
};

const EditDetails: React.FC = ({mode, rule, service, refetchParent}: RuleDetailsModalInterface) => {
    const [opened, { open, close }] = useDisclosure(false);
    const {isPending: pendingCreation, mutateAsync: createAsync} = useBillingRuleCreate();
    const {isPending: pendingUpdate, mutateAsync: updateAsync} = useBillingRuleUpdate();

    const createBillingRule = async (rule: BillingRule) => {
        createAsync({data: rule}).then(() => {
            close();
            notifications.show({message: 'Billing rule created successfully', color: 'green'});
            if (refetchParent) refetchParent();
        }).catch((error: any) => {
            notifications.show({message: `Billing rule creation failed: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        })
    };
    const updateBillingRule = async (rule: BillingRule) => {
        if (!rule) return;
        updateAsync({id: rule.id, data: rule}).then(() => {
            close();
            notifications.show({message: 'Billing rule updated successfully', color: 'green'});
            if (refetchParent) refetchParent();
        }).catch((error: any) => {
            notifications.show({message: `Billing rule update failed: ${JSON.stringify(error.response?.data)}`, color: 'red'});
        })
    };

    return (<>
        <Modal opened={opened} onClose={close} zIndex={225} title={rule? `Rule details - ${rule?.name}`: 'New Billing Rule'}>
            <BillingRuleForm service={service} actionFunction={mode === 'create' ? createBillingRule : updateBillingRule} passedValues={rule} />
            <LoadingOverlay visible={pendingCreation || pendingUpdate} />
        </Modal>
        {mode === 'create' ? (
            <Button size='xs' leftIcon={<IconPlus />} onClick={open} variant="filled">New Billing Rule</Button>
        ): (
            <ActionIcon size='xs' variant="filled" color="blue" onClick={open}><IconPencil /></ActionIcon>
        )}
    </>

    );
};

export default EditDetails;